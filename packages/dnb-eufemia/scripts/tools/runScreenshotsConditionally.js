#!/usr/bin/env node

/**
 * Script to conditionally run screenshot tests with or without --bail flag
 * based on git commit message containing [run all]
 */

const { execSync } = require('child_process')
const path = require('path')
const packageJson = require('../../package.json')

/**
 * Get the latest commit message
 * @returns {string} The commit message
 */
function getLatestCommitMessage() {
  try {
    return execSync('git log -1 --pretty=%B', { encoding: 'utf8' }).trim()
  } catch (error) {
    console.warn(
      'Warning: Could not get git commit message:',
      error.message
    )
    return ''
  }
}

/**
 * Check if the commit message contains --run-all
 * @param {string} commitMessage - The commit message to check
 * @returns {boolean} True if --run-all is found
 */
function shouldRunAll(commitMessage) {
  return commitMessage.includes('--run-all')
}

/**
 * Run the screenshot tests with appropriate flags
 */
function runScreenshotsTests() {
  const commitMessage = getLatestCommitMessage()
  const runAll = shouldRunAll(commitMessage)

  // Base command without --bail
  const baseCommand = packageJson.scripts['test:screenshots:ci']

  // Remove --bail if --run-all is found
  const command = runAll ? baseCommand.replace('--bail', '') : baseCommand

  if (runAll) {
    console.log(
      `Running command without --bail because of --run-all in commit message: ${command}`
    )
  }

  try {
    execSync(command, {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '../..'),
    })
  } catch (error) {
    console.error('Screenshot tests failed')
    process.exit(1)
  }
}

// Run the script
runScreenshotsTests()
