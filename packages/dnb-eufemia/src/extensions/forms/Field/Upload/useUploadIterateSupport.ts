import { useCallback, useRef } from 'react'
import type { UploadFile, UploadValue } from './Upload'

/**
 * Hook to support Field.Upload in Iterate.Array contexts.
 *
 * Prevents cross-instance contamination when multiple Field.Upload instances
 * are used within Iterate.Array with async fileHandler and onFileDelete.
 *
 * The hook tracks File object references to identify which files belong to
 * which instance, ensuring files don't leak between array elements during
 * concurrent async operations (uploads/deletions).
 */
export function useUploadIterateSupport() {
  // Track File object references that belong to this instance
  const knownFileRefsRef = useRef<Set<File>>(new Set())

  /**
   * Check if a File object belongs to this instance
   */
  const isFileTracked = useCallback((file: File | undefined) => {
    return file instanceof File && knownFileRefsRef.current.has(file)
  }, [])

  /**
   * Track a File object as belonging to this instance
   */
  const trackFile = useCallback((file: File | undefined) => {
    if (file instanceof File) {
      knownFileRefsRef.current.add(file)
    }
  }, [])

  /**
   * Track multiple files at once
   */
  const trackFiles = useCallback((files: UploadValue) => {
    files?.forEach((f) => {
      if (f?.file instanceof File) {
        knownFileRefsRef.current.add(f.file)
      }
    })
  }, [])

  /**
   * Merge external files with pending files (loading or error state)
   */
  const mergeWithPending = useCallback(
    (externalFiles: UploadValue, pendingFiles: UploadFile[]) => {
      if (!pendingFiles.length) {
        return externalFiles
      }

      const externalIds = new Set(externalFiles?.map((f) => f?.id) || [])
      const missingInExternal = pendingFiles.filter(
        (f) => !externalIds.has(f.id)
      )

      return missingInExternal.length
        ? [...(externalFiles || []), ...missingInExternal]
        : externalFiles
    },
    []
  )

  /**
   * Get pending files (loading or error) that belong to this instance
   */
  const getPendingFiles = useCallback(
    (currentFiles: UploadFile[]) => {
      return currentFiles.filter((f) => {
        return isFileTracked(f.file) && (f.isLoading || f.errorMessage)
      })
    },
    [isFileTracked]
  )

  /**
   * Check if we should ignore an empty update in Iterate.Array context.
   * Returns true when another instance clears its files - we should keep ours.
   */
  const shouldIgnoreEmptyUpdate = useCallback(
    (externalValue: UploadValue, isIterateContext: boolean) => {
      const hasTrackedFiles = knownFileRefsRef.current.size > 0
      const isEmptyUpdate = !externalValue?.length
      return isIterateContext && hasTrackedFiles && isEmptyUpdate
    },
    []
  )

  /**
   * Filter cross-instance files from external value in Iterate.Array context.
   * Returns only files that belong to this instance.
   */
  const filterCrossInstanceFiles = useCallback(
    (externalValue: UploadValue, isIterateContext: boolean) => {
      if (!isIterateContext || !externalValue?.length) {
        return { filteredValue: externalValue, hasUnknownFiles: false }
      }

      const unknownFiles = externalValue.filter(
        (extFile) =>
          extFile?.file instanceof File && !isFileTracked(extFile.file)
      )

      const hasTrackedFiles = knownFileRefsRef.current.size > 0

      // Only filter if we detect unknown files and have tracked files
      if (!unknownFiles.length || !hasTrackedFiles) {
        return { filteredValue: externalValue, hasUnknownFiles: false }
      }

      const filteredValue = externalValue.filter((extFile) =>
        isFileTracked(extFile?.file)
      )

      return { filteredValue, hasUnknownFiles: true }
    },
    [isFileTracked]
  )

  return {
    isFileTracked,
    trackFile,
    trackFiles,
    mergeWithPending,
    getPendingFiles,
    shouldIgnoreEmptyUpdate,
    filterCrossInstanceFiles,
  }
}
