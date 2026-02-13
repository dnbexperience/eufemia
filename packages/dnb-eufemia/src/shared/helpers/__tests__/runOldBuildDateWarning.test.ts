import { runOldBuildDateWarning } from '../runOldBuildDateWarning'

describe('runOldBuildDateWarning', () => {
  let consoleLogSpy

  const NODE_ENV = process.env.NODE_ENV

  beforeEach(() => {
    process.env.NODE_ENV = 'development'
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
  })

  afterEach(() => {
    process.env.NODE_ENV = NODE_ENV
    consoleLogSpy?.mockRestore()
    if (window?.Eufemia) {
      delete window.Eufemia.buildDate
    }
  })

  it('should not log any message if NODE_ENV is "production"', () => {
    process.env.NODE_ENV = 'production'

    runOldBuildDateWarning()

    expect(consoleLogSpy).not.toHaveBeenCalled()
  })

  it('should not log any message if buildDate is missing', () => {
    window.Eufemia = {}

    runOldBuildDateWarning()

    expect(consoleLogSpy).not.toHaveBeenCalled()
  })

  it('should not log any message if buildDate is invalid', () => {
    window.Eufemia = { buildDate: 'not-a-date' }

    runOldBuildDateWarning()

    expect(consoleLogSpy).not.toHaveBeenCalled()
  })

  it('should not log any message if buildDate is less than three months old', () => {
    const now = new Date()
    const twoMonthsAgo = new Date(now)
    twoMonthsAgo.setMonth(now.getMonth() - 2)
    window.Eufemia = { buildDate: twoMonthsAgo.toISOString() }

    runOldBuildDateWarning()

    expect(consoleLogSpy).not.toHaveBeenCalled()
  })

  it('should log message if buildDate is more than three months old', () => {
    const now = new Date()
    const fourMonthsAgo = new Date(now)
    fourMonthsAgo.setMonth(now.getMonth() - 4)
    window.Eufemia = { buildDate: fourMonthsAgo.toISOString() }

    runOldBuildDateWarning()

    expect(consoleLogSpy).toHaveBeenCalledTimes(1)
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Your Eufemia version is older than 3 months. Please update.'
    )
  })
})
