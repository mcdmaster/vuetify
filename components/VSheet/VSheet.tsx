// Styles
import './VSheet.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeBorderRadiusProps, useBorderRadius, BorderRadiusProps } from '@/composables/border-radius'
import { makeDimensionProps, useDimension, DimensionProps } from '@/composables/dimensions'
import { makeElevationProps, useElevation, ElevationProps } from '@/composables/elevation'
import { makePositionProps, usePosition, PositionProps } from '@/composables/position'
import { makeTagProps } from '@/composables/tag'
import { useTheme } from '@/composables/theme'

// Types
import { BorderProps } from '@/composables/border'

// Utilities
import Vue, { computed } from 'vue'
import makeProps from '@/util/makeProps'

export function makeSheetProps () {
  return {
    ...makeBorderProps(),
    ...makeBorderRadiusProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeTagProps(),
  }
}

export interface SheetProps extends BorderProps, BorderRadiusProps, DimensionProps, ElevationProps, PositionProps {}

export function useSheet (props: SheetProps, name: string) {
  const { themeClasses } = useTheme()
  const { borderClasses } = useBorder(props, name)
  const { borderRadiusClasses } = useBorderRadius(props)
  const { dimensionStyles } = useDimension(props)
  const { elevationClasses } = useElevation(props)
  const { positionClasses, positionStyles } = usePosition(props, name)

  return {
    sheetClasses: computed(() => [
      themeClasses.value,
      borderClasses.value,
      borderRadiusClasses.value,
      elevationClasses.value,
      positionClasses.value,
    ]),
    sheetStyles: computed(() => [
      dimensionStyles.value,
      positionStyles.value,
    ]),
  }
}

const options: ThisType<typeof Vue> = {
  name: 'VSheet',

  props: makeProps(makeSheetProps()),

  setup (props: any, { slots }: any) {
    const { sheetClasses, sheetStyles } = useSheet(props, 'v-sheet')

    return () => (
      <props.tag
        class={['v-sheet', sheetClasses.value]}
        style={ sheetStyles.value }
        v-slots={ slots }
      />
    )
  },
}

export default options
