import { execSync } from 'node:child_process'
import { watchFile, unwatchFile } from 'node:fs'
import type { Plugin } from 'vite'

function getBranch(): string {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf-8',
    }).trim()
  } catch {
    return ''
  }
}

function getGitDir(): string {
  try {
    return execSync('git rev-parse --absolute-git-dir', {
      encoding: 'utf-8',
    }).trim()
  } catch {
    return ''
  }
}

/**
 * Vite plugin that pushes the current git branch name to the client
 * via HMR. Watches `.git/HEAD` so branch switches are detected
 * instantly without polling or page reloads.
 */
export default function gitBranchPlugin(): Plugin {
  return {
    name: 'git-branch',
    apply: 'serve',

    configureServer(server) {
      // Serve initial branch on HTTP for the first load
      server.middlewares.use('/__git-branch', (_req, res) => {
        res.setHeader('Content-Type', 'text/plain')
        res.end(getBranch())
      })

      // Watch .git/HEAD — it changes on branch switch.
      // Use watchFile (stat polling) because git replaces HEAD
      // atomically, which breaks fs.watch on macOS.
      const gitDir = getGitDir()
      if (gitDir) {
        const headPath = `${gitDir}/HEAD`
        watchFile(headPath, { interval: 1000 }, () => {
          server.hot.send('git-branch:update', { branch: getBranch() })
        })
        server.httpServer?.on('close', () => unwatchFile(headPath))
      }
    },
  }
}
