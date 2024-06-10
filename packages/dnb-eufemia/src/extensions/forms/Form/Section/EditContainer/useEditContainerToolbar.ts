import { useContext, useEffect } from 'react'
import SectionContainerContext from '../containers/SectionContainerContext'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'

export default function useEditContainerToolbar() {
  const { switchContainerMode } = useContext(SectionContainerContext) || {}
  const { hasSubmitError } = useContext(FieldBoundaryContext) || {}

  useEffect(() => {
    // Ensure the edit container is always in edit mode when the form has a submit error
    if (hasSubmitError) {
      switchContainerMode?.('edit')
    }
  }, [hasSubmitError, switchContainerMode])
}
