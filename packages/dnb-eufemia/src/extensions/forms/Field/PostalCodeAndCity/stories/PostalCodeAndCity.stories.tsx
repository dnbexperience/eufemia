import { useCallback, useState } from 'react'
import { Field, Form, Value } from '../../..'
import { Card } from '../../../../../components'

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

export function Verify() {
  const [value, setValue] = useState(undefined)

  const onChange = useCallback((value) => {
    verifyPostalCode(value).then((data) => {
      console.log('data', data?.postal_codes?.length, data.postal_codes[0])

      if (data?.postal_codes?.length) {
        setValue(data.postal_codes[0].city)
      }
    })
  }, [])

  const onBlurValidator = useCallback(async (value: string) => {
    if (!value || value?.length < 4) {
      return new Error('Postnummeret er for kort')
    }

    const data = await verifyPostalCode(value)
    if (data.postal_codes[0].postal_code !== value) {
      return new Error('Feil postnummer')
    }
  }, [])

  return (
    <Form.Handler>
      <Card stack>
        <Field.String
          label="String field"
          onBlurValidator={onBlurValidator}
        />
        <Field.PostalCodeAndCity
          postalCode={{
            onChange,
            onBlurValidator,
            // validateInitially: true,
            // required: true,
          }}
          city={{ value }}
        />
        <Form.SubmitButton />
      </Card>
    </Form.Handler>
  )
}

async function verifyPostalCode(postalCode: string) {
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
