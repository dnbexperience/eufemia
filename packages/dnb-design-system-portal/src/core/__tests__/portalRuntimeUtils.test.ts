import { describe, expect, it } from 'vitest'
import { loadTranslations } from '../portalRuntimeUtils'

describe('loadTranslations', () => {
  it('includes the en-US Forms translations', async () => {
    expect(await loadTranslations('en-US')).toMatchObject({
      'en-US': {
        DatePicker: { firstDay: 'sunday' },
        OrganizationNumber: { label: 'Organization number' },
      },
    })
  })
})
