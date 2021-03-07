// @ts-nocheck
/* eslint-disable */

import Vue from 'vue'

export default options
const options: ThisType<typeof Vue> = {
  name: 'localable',

  props: {
    locale: String,
  },

  computed: {
    currentLocale (): string {
      return this.locale || this.$vuetify.lang.current
    },
  },
}
