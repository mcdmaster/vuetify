// @ts-nocheck
/* eslint-disable */

// Styles
import './VSubheader.sass'

// Mixins
import Themeable from '../../mixins/themeable'
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'

export default defineComponent<
  Themeable
  /* @vue/component */
> ({
  name: 'v-subheader',

  props: {
    inset: Boolean,
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-subheader',
      class: {
        'v-subheader--inset': this.inset,
        ...this.themeClasses,
      },
      attrs: this.$attrs,
      on: this.$listeners,
    }, this.$slots.default)
  },
})
