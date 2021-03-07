// @ts-nocheck
/* eslint-disable */

import Vue from 'vue'

/* @vue/component */
export default options
const options: ThisType<typeof Vue> = {
  name: 'returnable',

  props: {
    returnValue: null as any,
  },

  data: () => ({
    isActive: false,
    originalValue: null as any,
  }),

  watch: {
    isActive (val) {
      if (val) {
        this.originalValue = this.returnValue
      } else {
        this.$emit('update:return-value', this.originalValue)
      }
    },
  },

  methods: {
    save (value: any) {
      this.originalValue = value
      setTimeout(() => {
        this.isActive = false
      })
    },
  },
}
