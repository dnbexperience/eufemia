import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import classnames from 'classnames'

import HeightAnimation from '../height-animation/HeightAnimation'
import { UploadContext } from './UploadContext'
import type {
  UploadAllProps,
  UploadFileNative,
  UploadProps,
} from './types'

export type UploadDragEvent = React.DragEvent | DragEvent

export default function UploadDropzone({
  children,
  className,
  ...rest
}: Partial<UploadAllProps>) {
  const props = rest as Omit<UploadProps, 'title' | 'onChange'>
  const context = useContext(UploadContext)
  const [hover, setHover] = useState(false)
  const hoverTimeout = useRef<NodeJS.Timer>()

  const { onInputUpload, id } = context

  const getFiles = useCallback((event: UploadDragEvent) => {
    const fileData = event.dataTransfer

    const files: Array<UploadFileNative> = []

    Array.from(fileData.files).forEach((file) => {
      files.push({ file })
    })

    return files
  }, [])

  const clearTimers = useCallback(() => {
    clearTimeout(hoverTimeout.current)
  }, [])

  const hoverHandler = useCallback(
    (event: UploadDragEvent, state: boolean) => {
      event.stopPropagation()
      event.preventDefault()
      clearTimers()
      setHover(state)
    },
    [clearTimers]
  )

  const dropHandler = useCallback(
    (event: UploadDragEvent) => {
      const files = getFiles(event)

      onInputUpload(files)
      hoverHandler(event, false)
    },
    [getFiles, onInputUpload, hoverHandler]
  )

  const dragEnterHandler = useCallback(
    (event: UploadDragEvent) => {
      hoverHandler(event, true)
    },
    [hoverHandler]
  )

  const dragLeaveHandler = useCallback(
    (event: UploadDragEvent) => {
      hoverHandler(event, false)
    },
    [hoverHandler]
  )

  useEffect(() => {
    const elem = document.body
    const execute = () => {
      try {
        if (!elem.hasAttribute('data-upload-drop-zone')) {
          const add = elem.addEventListener
          add('drop', dropHandler)
          add('dragover', dragEnterHandler)
          add('dragleave', dragLeaveHandler)
          elem.setAttribute('data-upload-drop-zone', id)
        }
      } catch (e) {
        //
      }
    }
    const timeoutId = setTimeout(execute, 10) // Add the listeners delayed (ms) without prioritization, in case of re-renders

    return () => {
      clearTimers()
      clearTimeout(timeoutId)
      try {
        if (elem.getAttribute('data-upload-drop-zone') === id) {
          const remove = elem.removeEventListener
          remove('drop', dropHandler)
          remove('dragover', dragEnterHandler)
          remove('dragleave', dragLeaveHandler)
          elem.removeAttribute('data-upload-drop-zone')
        }
      } catch (e) {
        //
      }
    }
  }, [clearTimers, dragEnterHandler, dragLeaveHandler, dropHandler, id])

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
