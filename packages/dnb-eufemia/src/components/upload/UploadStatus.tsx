import React from 'react'
import { UploadContext } from './UploadContext'
import FormStatus from '../FormStatus'
import useUpload from './useUpload'
import HeightAnimation from '../height-animation/HeightAnimation'

const UploadStatus = () => {
  const context = React.useContext(UploadContext)

  const { id, filesAmountLimit, errorAmountLimit } = context
  const { internalFiles } = useUpload(id)
  const open = internalFiles.length > filesAmountLimit

  return (
    <HeightAnimation
      open={open}
      delay={
        500 /* delay the animation to avoid flickering while each file animates */
      }
    >
      <FormStatus shellSpace={{ top: 'small' }} stretch>
        {String(errorAmountLimit).replace(
          '%amount',
          String(filesAmountLimit)
        )}
      </FormStatus>
    </HeightAnimation>
  )
}

export default UploadStatus
