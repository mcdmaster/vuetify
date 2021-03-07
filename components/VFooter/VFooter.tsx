// Styles
import './VFooter.sass'

// Composables
import { makeSheetProps, useSheet } from '@/components/VSheet/VSheet'
import { makeTagProps } from '@/composables/tag'

// Utilities
import makeProps from '@/util/makeProps'
import Vue from 'vue'

const options: ThisType<typeof Vue> = {
  name: 'VFooter',

  props: makeProps({
    ...makeSheetProps(),
    ...makeTagProps({ tag: 'footer' }),
  }),

  setup (props: any, { slots }: any) {
    const { sheetClasses, sheetStyles } = useSheet(props, 'v-footer')

    return () => (
      <props.tag
        class={[
          'v-footer',
          sheetClasses.value,
        ]}
        style={ sheetStyles.value }
        v-slots={ slots }
      />
    )
  },
}

export default options
