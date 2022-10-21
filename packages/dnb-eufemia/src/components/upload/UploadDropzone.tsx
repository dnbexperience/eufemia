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

  const getFiles = (event: React.DragEvent) => {
    const fileData = event.dataTransfer

    const files: UploadFile[] = []

    Array.from(fileData.files).forEach((file, i) => {
      files.push({ file })
    })

    return files
  }

  const hoverHandler = (event: React.DragEvent, state: boolean) => {
    event.stopPropagation()
    event.preventDefault()
    clearTimers()
    setHover(state)
  }

  const dropHandler = (event: React.DragEvent) => {
    const files = getFiles(event)

    onInputUpload(files)
    hoverHandler(event, false)
  }

  const dragEnterHandler = (event: React.DragEvent) => {
    hoverHandler(event, true)
  }

  const dragLeaveHandler = (event: React.DragEvent) => {
    hoverHandler(event, false)
  }

  const clearTimers = () => {
    clearTimeout(hoverTimeout.current)
  }

  React.useEffect(() => clearTimers, [])

  return (
    <HeightAnimation
      className={classnames(className, hover && 'dnb-upload--active')}
      onDrop={dropHandler}
      onDragOver={dragEnterHandler}
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
          rx="0.5rem"
          ry="0.5rem"
          strokeWidth="3"
          strokeDashoffset="4"
          strokeDasharray="8 8"
        />
      </svg>
    </HeightAnimation>
  )
}
