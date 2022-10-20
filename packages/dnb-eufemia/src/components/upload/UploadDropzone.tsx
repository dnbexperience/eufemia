import React from 'react'
import classnames from 'classnames'

import HeightAnimation from '../height-animation/HeightAnimation'
import { UploadContext } from './UploadContext'
import type { UploadAllProps, UploadFile, UploadProps } from './types'

export default function UploadDropzone({
  children,
  className,
  ...rest
}: Partial<UploadAllProps>) {
  const props = rest as Omit<UploadProps, 'title'>
  const context = React.useContext(UploadContext)
  const [hover, setHover] = React.useState(false)
  const hoverTimeout = React.useRef<NodeJS.Timer>()

  const { onInputUpload } = context

  const dropHandler = (event: React.DragEvent) => {
    event.preventDefault()

    const fileData = event.dataTransfer

    const files: UploadFile[] = []

    Array.from(fileData.files).forEach((file, i) => {
      files.push({ file })
    })

    onInputUpload(files)

    setHover(false)
  }

  const dragOverHandler = (event: React.SyntheticEvent) => {
    event.preventDefault()
    clearTimers()
    setHover(true)
  }

  const dragLeaveHandler = (event: React.SyntheticEvent) => {
    event.preventDefault()
    clearTimers()
    hoverTimeout.current = setTimeout(() => {
      setHover(false)
    }, 300) // prevent flickering
  }

  const clearTimers = () => {
    clearTimeout(hoverTimeout.current)
  }

  React.useEffect(() => {
    return clearTimers
  }, [])

  return (
    <HeightAnimation
      className={classnames(className, hover && 'dnb-upload--active')}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      {...props}
    >
      {children}

      <svg
        className="dnb-upload__outline"
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <rect
          width="100%"
          height="100%"
          rx="0.25rem"
          ry="0.25rem"
          strokeWidth="2.5"
          strokeDasharray="7 7"
        />
      </svg>
    </HeightAnimation>
  )
}
