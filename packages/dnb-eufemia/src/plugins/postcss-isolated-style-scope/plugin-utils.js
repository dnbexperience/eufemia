const path = require('path')
const fs = require('fs')

module.exports.findPathToScopeHash = function findPathToScopeHash(
  filePath
) {
  const parts = filePath.split(path.sep)
  parts.pop() // Remove the filename

  // Handle absolute paths (starting with slash)
  const isAbsolute = filePath.startsWith(path.sep)
  let currentPath = isAbsolute ? path.sep : parts[0] // Start with root or first part

  for (let i = isAbsolute ? 1 : 1; i < parts.length; i++) {
    currentPath = path.join(currentPath, parts[i])
    const scopeHashPath = path.join(currentPath, 'scope-hash.txt')

    if (fs.existsSync(scopeHashPath)) {
      return currentPath
    }
  }

  return null
}

module.exports.getScopeHashFromFile = function getScopeHashFromFile(
  scopeHashFromFile
) {
  return fs.readFileSync(
    path.join(scopeHashFromFile, 'scope-hash.txt'),
    'utf-8'
  )
}
