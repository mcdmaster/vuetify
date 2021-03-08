// @ts-nocheck
/* eslint-disable */

// Extensions
import { BaseItemGroup } from '../../components/VItemGroup/VItemGroup'

/* @vue/component */
export default defineComponent<BaseItemGroup> ({
  name: 'button-group',

  provide (): object {
    return {
      btnToggle: this,
    }
  },

  computed: {
    classes (): object {
      return BaseItemGroup.options.computed.classes.call(this)
    },
  },

  methods: {
    // Isn't being passed down through types
    genData: BaseItemGroup.options.methods.genData,
  },
})
