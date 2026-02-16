export function runOldBuildDateWarning() {
  try {
    if (
      typeof document !== 'undefined' &&
      process.env.NODE_ENV !== 'production'
    ) {
      const buildDate = window.Eufemia?.buildDate

      if (!buildDate || typeof buildDate !== 'string') {
        return
      }

      const buildDateValue = new Date(buildDate)

      if (Number.isNaN(buildDateValue.getTime())) {
        return
      }

      const threeMonthsAfterBuildDate = new Date(buildDateValue)
      threeMonthsAfterBuildDate.setMonth(
        threeMonthsAfterBuildDate.getMonth() + 3
      )

      if (Date.now() > threeMonthsAfterBuildDate.getTime()) {
        console.log(
          'Your Eufemia version is older than 3 months. Please update.'
        )
      }
    }
  } catch (error) {
    console.error(error)
  }
}
