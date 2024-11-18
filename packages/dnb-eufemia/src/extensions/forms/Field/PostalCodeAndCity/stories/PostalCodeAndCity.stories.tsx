import { Field, Form, Value } from '../../..'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/PostalCodeAndCity',
}

export const PostalCodeAndCity = () => {
  return (
    <Field.PostalCodeAndCity
      postalCode={{
        label: 'With a very long label',
        error: new Error('Feil i postnummeret'),
      }}
      city={{
        label: 'With a very long label',
        error: new Error('Feil i poststedet'),
      }}
      error={
        new Error(
          'Flere feil (test) som går over flere linjer og som aldrig slutter'
        )
      }
      help={{
        title: 'Help is available',
        content:
          'Somewhere along the way, we must learn that there is nothing greater than to do something for others.',
      }}
    />
  )
}

export function PostalCodeAndCityCountryCodeSelection() {
  return (
    <>
      <Form.Handler>
        <Field.Selection path="/country" defaultValue="NO" variant="radio">
          <Field.Option value="NO" label="Norway" />
          <Field.Option value="DE" label="Germany" />
        </Field.Selection>
        <Field.PostalCodeAndCity
          country="/country"
          postalCode={{ path: '/postalCode' }}
          city={{ path: '/city' }}
        />
        <Value.PostalCodeAndCity
          postalCode={{ path: '/postalCode' }}
          city={{ path: '/city' }}
        />
      </Form.Handler>
    </>
  )
}

/**
 * The idea is to add a new property called  "connector" to every field that can be used with the Bring API.
 * A connector allows a field to both support events like before, but also events from the connector.
 * A connector is essentially a plugin that can be used to add support for APIs like Bring.
 * Eufemia Forms delivers a default connector that devs can use with their own APIs and tokens etc.
 *
 * This is a draft on how we can deliver a flexible Bring API connection.
 * It should be possible to customize / replace:
 *
 * - fetch routine
 * - maybe it always should be defined?
 * - how properties are mapped get and set
 * - API url and headers
 * - add a plugin system, so we can add support for other APIs than Bring
 *
 */

/**
 * This is a part of Eufemia:
 */
const External = {
  BringConnector: {
    postalCodeAndCity: (apiConnectionConfig = null) => {
      return {
        postalCode: {
          // onChange: async (value) => {
          //   await new Promise((resolve) => setTimeout(resolve, 1000))
          // },
          onBlurValidator: async (value) => {
            const data = await verifyPostalCodeByAPI(value)
            if (data.postal_codes[0].postal_code !== value) {
              return new Error('💁‍♂️ Feil i postnummeret')
            }
          },
        },
        city: {
          // onChange: async (value) => {
          //   await new Promise((resolve) => setTimeout(resolve, 1000))
          // },
        },
      }
    },
  },
}

export function PostalCodeAPI_Draft() {
  return (
    <Form.Handler defaultData={{ postalCode: '123', city: 'Oslo' }}>
      {/* <Field.PostalCodeAndCity
        // import { External } from '@dnb/eufemia/extensions/forms'
        // connector={External.BringConnector.postalCodeAndCity()}
        postalCode={{
          path: '/postalCode',
          // onChange: async (value) => {
          //   await new Promise((resolve) => setTimeout(resolve, 1000))
          //   console.log('onChange', value)
          // },
          onBlurValidator: async (value) => {
            console.log('value', value)
            await new Promise((resolve) => setTimeout(resolve, 2000))
            return new Error('💁‍♂️ Feil i postnummeret')
          },
          validateInitially: true,
        }}
        city={{ path: '/city' }}
      /> */}

      <Field.PostalCodeAndCity
        postalCode={{
          placeholder: '????',
          onChange: (value) => console.log('postalCode onChange', value),
        }}
        city={{
          placeholder: 'Your city',
          onChange: (value) => console.log('city onChange', value),
        }}
      />
    </Form.Handler>
  )
}

async function verifyPostalCodeByAPI(postalCode: string) {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const mockData = {
    city: 'Vollen',
    county: 'Akershus',
    latitude: '59.78899739297151',
    longitude: '10.482494731266165',
    municipality: 'Asker',
    municipalityId: '3203',
    po_box: false,
    postal_code: '1391',
  }
  return { postal_codes: [mockData] }

  // Visit: https://cors-anywhere.herokuapp.com/corsdemo to enable this service
  const url = `https://cors-anywhere.herokuapp.com/https://api.bring.com/address/api/no/postal-codes/${postalCode}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-Mybring-API-Uid': '',
      'X-Mybring-API-Key': '',
    },
  })

  return await response.json()
}

// // This is a config for a Bring Plugin
// const apiConnectionConfig = {
//   // Optional
//   connections: {
//     // Optional
//     postalCode: {
//       // Optional
//       url: ({ postalCode }) =>
//         `https://api.bring.com/address/api/no/postal-codes/${postalCode}`,
//       // Optional
//       // headers: {
//       //   'X-Mybring-API-Uid': '',
//       // },
//     },
//   },
//   // Optional
//   sharedBetweenAllConnections: {
//     headers: {
//       'X-Mybring-API-Uid': '',
//     },
//   },
//   // Optional
//   // fetch: async ({ url }) => {
//   //   return await fetch(url, {
//   //     method: 'GET',
//   //     headers: {
//   //       Accept: 'application/json',
//   //       'X-Mybring-API-Uid': '',
//   //       'X-Mybring-API-Key': '',
//   //     },
//   //   })
//   // },
// }
