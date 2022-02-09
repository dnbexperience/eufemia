export function init() {
  if (typeof window !== 'undefined') {
    class Eufemia {
      get version() {
        return '__VERSION__'
      }
    }

    window.Eufemia = new Eufemia()
  }
}
