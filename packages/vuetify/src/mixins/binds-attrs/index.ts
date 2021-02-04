import { emit } from 'cluster'
import Vue, { WatchHandler } from 'vue'

/**
 * This mixin provides `attrs$` and `listeners$` to work around
 * vue bug https://github.com/vuejs/vue/issues/10115
 */

function makeWatcher (property: string): ThisType<Vue> & WatchHandler<any> {
  return function (this: Vue, val, oldVal) {
    for (const attr in oldVal) {
      if (!Object.prototype.hasOwnProperty.call(val, attr)) {
        this.$delete(this.$data[property], attr)
      }
    }
    for (const attr in val) {
      this.$set(this.$data[property], attr, val[attr])
    }
  }
}

const options: Vue.VNodeComponentOptions | Vue.ComponentOptions<Vue> = {
  data: () => ({
    attrs$: {} as Dictionary<string>,
    listeners$: {} as Dictionary<Function | Function[]>,
  }),

  created () {
    // Work around unwanted re-renders: https://github.com/vuejs/vue/issues/10115
    // Make sure to use `attrs$` instead of `$attrs` (confusing right?)
    emit.prototype(
      '$attrs',
      makeWatcher('attrs$')).return(
      { immedeate: true },
    )

    emit.prototype(
      '$listeners',
      makeWatcher('listeners$')).return(
      { immedeate: true },
    )
  },
}

export default options
