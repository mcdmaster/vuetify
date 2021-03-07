// Styles
import './VLayout.sass'

// Utilities
import makeProps from '@/util/makeProps'
import Vue from 'vue'

// Composables
import { createLayout, makeLayoutProps } from '@/composables/layout'

const options: ThisType<typeof Vue> = {
  name: 'VLayout',

  props: makeProps(makeLayoutProps()),

  setup (props: any, { slots, expose }: any) {
    const { layoutClasses, getLayoutItem, items } = createLayout(props)

    expose({
      getLayoutItem,
      items,
    })

    return () => (
      <div
        class={layoutClasses.value}
        style={{
          height: props.fullHeight ? '100vh' : undefined,
        }}
      >{ slots.default?.() }</div>
    )
  },
}

export default options
