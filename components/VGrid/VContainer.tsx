// Styles
import './VGrid.sass'

// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import makeProps from '@/util/makeProps'
import Vue from 'vue'

const options: ThisType<typeof Vue> = {
  name: 'VContainer',

  props: makeProps({
    fluid: {
      type: Boolean,
      default: false,
    },
    ...makeTagProps(),
  }),

  setup (props: any, { slots }: any) {
    return () => (
      <props.tag
        class={[
          'v-container',
          { 'v-container--fluid': props.fluid },
        ]}
        v-slots={ slots }
      />
    )
  },
}

export default options
