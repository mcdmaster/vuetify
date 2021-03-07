// Styles
import './VDivider.sass'

// Utilities
import Vue, { computed } from 'vue'
import { convertToUnit } from '@/util/helpers'
import makeProps from '@/util/makeProps'

// Composables
import { useTheme } from '@/composables/theme'

// Types
type DividerKey = 'borderRightWidth' | 'borderTopWidth' | 'maxHeight' | 'maxWidth'
type DividerStyles = Partial<Record<DividerKey, string>>

const options: ThisType<typeof Vue> = {
  name: 'VDivider',

  props: makeProps({
    inset: Boolean,
    length: [Number, String],
    thickness: [Number, String],
    vertical: Boolean,
  }),

  setup (props: any, { attrs }: any) {
    const { themeClasses } = useTheme()
    const dividerStyles = computed(() => {
      const styles: DividerStyles = {}

      if (props.length) {
        styles[props.vertical ? 'maxHeight' : 'maxWidth'] = convertToUnit(props.length)
      }

      if (props.thickness) {
        styles[props.vertical ? 'borderRightWidth' : 'borderTopWidth'] = convertToUnit(props.thickness)
      }

      return styles
    })

    return () => {
      return (
        <hr
          class={[
            {
              'v-divider': true,
              'v-divider--inset': props.inset,
              'v-divider--vertical': props.vertical,
            },
            themeClasses.value,
          ]}
          style={ dividerStyles.value }
          aria-orientation={
            !attrs.role || attrs.role === 'separator'
              ? props.vertical ? 'vertical' : 'horizontal'
              : undefined
          }
          role={`${attrs.role || 'separator'}`}
        />
      )
    }
  },
}

export default options
