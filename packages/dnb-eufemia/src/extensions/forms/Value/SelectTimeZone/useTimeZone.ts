import { useCallback, useContext } from 'react'
import SharedContext from '../../../../shared/Context'
import { getTimeZoneData } from '../../Field/SelectTimeZone'
import useTimeZones from '../../Field/SelectTimeZone/useTimeZones'
import { TimeZoneLang, TimeZoneType } from '../../constants/timezones'

export default function useTimeZone() {
  const { locale } = useContext(SharedContext)
  const { timezones } = useTimeZones()

  const getTimeZoneNameByIdentifier = useCallback(
    (identifier: TimeZoneType['timezone']) => {
      if (!identifier) {
        return null
      }

      const lang = locale?.split('-')[0] as TimeZoneLang
      return getTimeZoneData({
        timezones,
        lang,
        filter: (timezone) => {
          return timezone.timezone === identifier
        },
      })?.at(0)?.content
    },
    [timezones, locale]
  )

  return { getTimeZoneNameByIdentifier }
}

