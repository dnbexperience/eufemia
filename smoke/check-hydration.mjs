/**
 * Hydration check: serve a production-built Next.js consumer and load its
 * /hydration page in Chromium. Fails when React reports an error, e.g. a
 * hydration mismatch, or replaces the server-rendered form instead of hydrating it.
 *
 * Covers a server-rendered Wizard.Container, and a Form.Handler restoring a
 * session storage draft that the server cannot know about.
 */
import { spawn } from 'node:child_process'
import { createServer } from 'node:net'
import path from 'node:path'

const ROUTE = '/hydration'
const SESSION_STORAGE_ID = 'smoke-hydration'
const DRAFT = { choice: true, extra: 'Restored' }

export async function checkHydration(workDir) {
  const { chromium } = await import('playwright')
  const port = await getFreePort()
  const url = `http://localhost:${port}${ROUTE}`
  const server = startServer(workDir, port)

  try {
    await waitForServer(url, server)

    const browser = await chromium.launch()
    try {
      await assertHydration(browser, url)
    } finally {
      await browser.close()
    }
  } finally {
    server.child.kill()
  }

  console.log(
    'Hydration check passed: no hydration errors, with and without a session storage draft.'
  )
}

async function assertHydration(browser, url) {
  await assertPage(browser, url, {
    scenario: 'without a session storage draft',
  })
  await assertPage(browser, url, {
    scenario: 'with a session storage draft',
    draft: DRAFT,
  })
}

async function assertPage(browser, url, { scenario, draft }) {
  const context = await browser.newContext()
  await context.addInitScript(rememberServerForm)

  // Seed the draft before any page script runs, like a draft saved on an earlier visit
  if (draft) {
    await context.addInitScript(
      ([key, value]) => window.sessionStorage.setItem(key, value),
      [SESSION_STORAGE_ID, JSON.stringify(draft)]
    )
  }

  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text())
    }
  })

  await page.goto(url)
  await waitForHydration(page)
  await assertServerFormKept(page, errors, scenario)

  if (draft) {
    const extra = page.getByLabel('Extra')
    await extra.waitFor({ timeout: 10000 })
    const restoredValue = await extra.inputValue()
    if (restoredValue !== draft.extra) {
      throw new Error(
        `Hydration check failed: the session storage draft was not restored (got "${restoredValue}")`
      )
    }
  }

  await context.close()
}

// Keep a reference to the <form> the HTML parser created, before React hydrates it
function rememberServerForm() {
  new MutationObserver((records, observer) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        const form =
          node.nodeType === Node.ELEMENT_NODE &&
          (node.matches('form') ? node : node.querySelector('form'))
        if (form) {
          window.__smokeServerForm = form
          observer.disconnect()
          return
        }
      }
    }
  }).observe(document, { childList: true, subtree: true })
}

async function waitForHydration(page) {
  await page.waitForFunction(() => window.__smokeHydrated, null, {
    timeout: 30000,
  })

  // Give React time to report errors from the hydration commit
  await page.waitForTimeout(500)
}

async function assertServerFormKept(page, errors, scenario) {
  const kept = await page.evaluate(
    () =>
      Boolean(window.__smokeServerForm?.isConnected) &&
      window.__smokeServerForm === document.querySelector('form')
  )

  if (errors.length > 0 || !kept) {
    throw new Error(
      [
        `Hydration check failed ${scenario}:`,
        kept ? null : '- React replaced the server-rendered form',
        ...errors.map((error) => `- ${error}`),
      ]
        .filter(Boolean)
        .join('\n')
    )
  }
}

function startServer(workDir, port) {
  const output = []
  const child = spawn(
    process.execPath,
    [
      path.join(workDir, 'node_modules/next/dist/bin/next'),
      'start',
      '--port',
      String(port),
    ],
    { cwd: workDir, stdio: ['ignore', 'pipe', 'pipe'] }
  )
  child.stdout.on('data', (chunk) => output.push(String(chunk)))
  child.stderr.on('data', (chunk) => output.push(String(chunk)))

  return { child, output }
}

async function waitForServer(url, server, timeout = 60000) {
  const start = Date.now()

  while (Date.now() - start < timeout) {
    if (server.child.exitCode !== null) {
      break
    }

    try {
      const response = await fetch(url)
      if (response.ok) {
        return
      }
    } catch {
      // Not listening yet
    }

    await new Promise((resolve) => setTimeout(resolve, 250))
  }

  throw new Error(
    `Hydration check failed: the Next.js server did not serve ${url}\n${server.output.join('')}`
  )
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = createServer()
    server.unref()
    server.on('error', reject)
    server.listen(0, () => {
      const { port } = server.address()
      server.close(() => resolve(port))
    })
  })
}
