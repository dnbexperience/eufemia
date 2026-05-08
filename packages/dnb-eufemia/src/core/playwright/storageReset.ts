type StorageLike = {
  clear(): void
}

export function clearStorageSafely(storage?: StorageLike | null) {
  try {
    storage?.clear()
  } catch {
    // stop here
  }
}

export function clearBrowserStorages() {
  const clearBrowserStorage = (
    getStorage: () => StorageLike | null | undefined
  ) => {
    try {
      clearStorageSafely(getStorage())
    } catch {
      // stop here
    }
  }

  clearBrowserStorage(() => window.localStorage)
  clearBrowserStorage(() => window.sessionStorage)
}
