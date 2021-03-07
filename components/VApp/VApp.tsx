// Styles
import './VApp.sass'

// Utilities
import makeProps from '@/util/makeProps'
import Vue from 'vue'

// Composables
import { useTheme } from '@/composables/theme'
import { createLayout, makeLayoutProps } from '@/composables/layout'

const options: ThisType<typeof Vue> = {
  name: 'VApp',

  props: makeProps({
    theme: String,
    ...makeLayoutProps(),
  }),

  setup (props: any, { slots }: any) {
    const { themeClasses } = useTheme()
    const { layoutClasses } = createLayout(props)

    return () => (
      <div class={['v-application', themeClasses.value, layoutClasses.value]} data-app="true">
        <div class="v-application__wrap">{ slots.default?.() }</div>
      </div>
    )
  },
}

export default options
