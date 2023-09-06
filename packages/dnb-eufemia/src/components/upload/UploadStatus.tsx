import React from 'react'
import { UploadContext } from './UploadContext'
import FormStatus from '../FormStatus'
import useUpload from './useUpload'
import HeightAnimation from '../height-animation/HeightAnimation'

const UploadStatus = () => {
  const context = React.useContext(UploadContext)

  const { id, filesAmountLimit, errorAmountLimit } = context

  const { internalFiles } = useUpload(id)

  return (
    <HeightAnimation open={internalFiles.length > filesAmountLimit}>
      <FormStatus top stretch>
        {String(errorAmountLimit).replace(
          '%amount',
          String(filesAmountLimit)
        )}
      </FormStatus>
    </HeightAnimation>
  )
}

export default UploadStatus
