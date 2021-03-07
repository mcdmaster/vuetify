// @ts-nocheck
/* eslint-disable */

// Styles
import './VDataTableHeader.sass'

// Components
import VDataTableHeaderMobile from './VDataTableHeaderMobile'
import VDataTableHeaderDesktop from './VDataTableHeaderDesktop'

// Mixins
import header from './mixins/header'

// Utilities
import dedupeModelListeners from '../../util/dedupeModelListeners'
import mergeData from '../../util/mergeData'
import rebuildSlots from '../../util/rebuildFunctionalSlots'

// Types
import Vue from 'vue'

/* @vue/component */
export default options
const options: ThisType<typeof Vue> = {
  name: 'v-data-table-header',

  functional: true,

  props: {
    ...header.options.props,
    mobile: Boolean,
  },

  render (h, { props, data, slots }) {
    dedupeModelListeners(data)
    const children = rebuildSlots(slots(), h)

    data = mergeData(data, { props })

    if (props.mobile) {
      return h(VDataTableHeaderMobile, data, children)
    } else {
      return h(VDataTableHeaderDesktop, data, children)
    }
  },
}
