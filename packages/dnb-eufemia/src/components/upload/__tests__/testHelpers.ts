export function createMockFile(
  name: string,
  size: number,
  type: string,
  lastModified?: number
) {
  const file = new File([], name, { type, lastModified })
  Object.defineProperty(file, 'size', {
    get() {
      return size
    },
  })
  return file
}
