// @ts-nocheck
/* eslint-disable */

import Vue from 'vue'

export default defineComponent({
  name: 'localable',

  props: {
    locale: String,
  },

  computed: {
    currentLocale (): string {
      return this.locale || this.$vuetify.lang.current
    },
  },
})
