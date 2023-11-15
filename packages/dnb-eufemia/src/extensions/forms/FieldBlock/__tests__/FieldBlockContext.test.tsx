import React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import { Field } from '../..'
import FieldBlockContext from '../FieldBlockContext'

describe('FieldBlockContext', () => {
  it('should receive the error instead of inner components rendering it', async () => {
    const setError = jest.fn()
    const setShowError = jest.fn()

    render(
      <FieldBlockContext.Provider value={{ setError, setShowError }}>
        <Field.String value="ab" minLength={5} validateInitially />
      </FieldBlockContext.Provider>
    )

    await waitFor(() => {
      expect(setError).toHaveBeenCalledTimes(1)
      expect(setShowError).toHaveBeenCalledTimes(1)
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })
})
