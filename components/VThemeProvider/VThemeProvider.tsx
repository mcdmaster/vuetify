// Styles
import './VThemeProvider.sass'

// Utilities
import { provideTheme } from '@/composables/theme'
import makeProps from '@/util/makeProps'

import Vue from 'vue'

const options: ThisType<typeof Vue> = {
  name: 'VThemeProvider',

  props: makeProps({
    theme: {
      type: String,
    },
    // TODO: Better name
    newContext: {
      type: Boolean,
    },
  }),

  setup (props: any, context: any) {
    const { themeClasses } = provideTheme(props, context)

    return () => {
      return (
        <div class={['v-theme-provider', themeClasses.value]}>
          <div>{ context.slots.default?.() }</div>
        </div>
      )
    }
  },
}

export default options
