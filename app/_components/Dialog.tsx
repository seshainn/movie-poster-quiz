import { useCallback, useEffect, useRef } from 'react'

const Dialog = ({
  onClose,
  children,
}: {
  onClose: () => void
  children: React.ReactNode
}) => {
  const dialogRef = useRef<HTMLDivElement>(null)

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  const handleEscapeKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    },
    [handleClose]
  )

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        handleClose()
      }
    },
    [handleClose]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscapeKeyPress)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscapeKeyPress)
    }
  }, [handleOutsideClick, handleEscapeKeyPress])

  return (
    <div
      ref={dialogRef}
      className='fixed flex items-center justify-center z-50'
    >
      <div className='bg-orange-50 dark:bg-teal-50 p-6 rounded-md shadow-md max-h-[500px] overflow-auto'>
        <button
          onClick={handleClose}
          className='w-full border py-2 rounded-md text-gray-500 hover:text-black bg-gray-100 hover:bg-gray-200 mb-2'
        >
          Close
        </button>
        {children}
        <button
          onClick={handleClose}
          className='w-full border py-2 rounded-md text-gray-500 hover:text-black bg-gray-100 hover:bg-gray-200 mt-2'
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default Dialog
