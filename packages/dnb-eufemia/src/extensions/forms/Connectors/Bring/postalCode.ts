import setData from '../../Form/data-context/setData'
import { GeneralConfig, fetchDataFromAPI } from '../'
import { UseFieldProps } from '../../types'

export type HandlerConfig = {
  cityPath: string
}

async function fetchData(value: string, generalConfig: GeneralConfig) {
  // Mock API response
  // await new Promise((resolve) => setTimeout(resolve, 800))
  // const mockData = {
  //   city: 'Vollen',
  //   county: 'Akershus',
  //   latitude: '59.78899739297151',
  //   longitude: '10.482494731266165',
  //   municipality: 'Asker',
  //   municipalityId: '3203',
  //   po_box: false,
  //   postal_code: '1391',
  // }
  // return { postal_codes: [mockData] }

  // Visit: https://cors-anywhere.herokuapp.com/corsdemo to enable this service
  generalConfig.fetchConfig.url = `https://cors-anywhere.herokuapp.com/https://api.bring.com/address/api/no/postal-codes/${value}`

  return await fetchDataFromAPI(generalConfig)
}

export function onChange(
  generalConfig: GeneralConfig,
  handlerConfig?: HandlerConfig
): UseFieldProps<string>['onChange'] {
  return async function onChange(value) {
    if (typeof value === 'string' && value.length >= 4) {
      try {
        const data = await fetchData(value, generalConfig)
        // console.log('onChange', generalConfig, handlerConfig, value, data)

        const { city } = data.postal_codes[0] || {}
        if (handlerConfig?.cityPath) {
          const dataContext = setData(generalConfig.handlerId)
          dataContext.update(handlerConfig.cityPath, city)
        }
      } catch (error) {
        return new Error(error)
      }
    }
  }
}

export function onBlurValidator(
  generalConfig: GeneralConfig
): UseFieldProps<string>['onBlurValidator'] {
  return async function onBlurValidator(value) {
    try {
      const data = await fetchData(value, generalConfig)
      // console.log('onBlurValidator', generalConfig, value, data)

      if (data.postal_codes?.[0]?.postal_code !== value) {
        return new Error('💁‍♂️ Feil i postnummeret')
      }
    } catch (error) {
      return new Error(error)
    }
  }
}
