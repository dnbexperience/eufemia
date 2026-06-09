import { useContext, useMemo } from 'react'
import Dropdown from '../dropdown/Dropdown'
import type { DropdownAllProps } from '../dropdown/Dropdown'
import type { DrawerListChangeEvent } from '../../fragments/drawer-list/DrawerList'
import { sort as sortIcon } from '../../icons'
import SharedContext from '../../shared/Context'
import useMedia from '../../shared/useMedia'

export type FilterSortButtonProps = {
  /**
   * Sort options passed to the underlying Dropdown. Each item should have a `selectedKey` and `content`.
   */
  data: DropdownAllProps['data']
  /**
   * Called when the user selects a sort option. Receives the Dropdown change event.
   */
  onChange?: (event: DrawerListChangeEvent) => void
  /**
   * The currently selected sort value.
   */
  value?: DropdownAllProps['value']
  /**
   * Default sort value on mount.
   */
  defaultValue?: DropdownAllProps['defaultValue']
} & Omit<
  DropdownAllProps,
  | 'data'
  | 'onChange'
  | 'value'
  | 'defaultValue'
  | 'variant'
  | 'icon'
  | 'iconPosition'
  | 'independentWidth'
  | 'title'
  | 'children'
>

function FilterSortButton({
  data,
  onChange,
  value,
  defaultValue,
  size = 'medium',
  ...rest
}: FilterSortButtonProps) {
  const sharedContext = useContext(SharedContext)
  const { sortButtonLabel } = sharedContext.getTranslation({}).Filter
  const { isSmall } = useMedia()

  // Inject selectedValue into each data item so the Dropdown always
  // displays the static sort label instead of the selected option text.
  const dataWithStaticTitle = useMemo(() => {
    if (!Array.isArray(data)) {
      return data
    }

    return data.map((item) => {
      if (typeof item === 'object' && item !== null) {
        return { ...item, selectedValue: sortButtonLabel }
      }

      return { content: item, selectedValue: sortButtonLabel }
    }) as DropdownAllProps['data']
  }, [data, sortButtonLabel])

  return (
    <Dropdown
      variant="tertiary"
      icon={sortIcon}
      iconPosition="left"
      independentWidth
      align={isSmall ? 'left' : 'right'}
      title={sortButtonLabel}
      data={dataWithStaticTitle}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      size={size}
      {...rest}
    />
  )
}

export default FilterSortButton
