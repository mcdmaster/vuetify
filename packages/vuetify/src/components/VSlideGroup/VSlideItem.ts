// @ts-nocheck
/* eslint-disable */

// Extensions
import { BaseItem } from '../VItemGroup/VItem'

// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable'
import mixins from '../../util/mixins'

export default defineComponent<
  BaseItem &
  GroupableFactory('slideGroup')
  /* @vue/component */
> ({
  name: 'v-slide-item',
})
