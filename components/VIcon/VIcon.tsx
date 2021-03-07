// Styles
import './VIcon.sass'

// Utilities
import Vue, { computed, ComputedRef } from 'vue'
import { makeSizeProps, useSize } from '../../composables/size'
import { convertToUnit, flattenFragments } from '../../util'
import { makeTagProps } from '../../composables/tag'
import makeProps from '../../util/makeProps'

const options: ThisType<typeof Vue> = {
  name: 'VIcon',

  props: makeProps({
    disabled: Boolean,
    left: Boolean,
    right: Boolean,
    icon: {
      type: [String, Object],
    },
    ...makeSizeProps(),
    ...makeTagProps({ tag: 'i' }),
  }),

  setup (props: any, { slots }: any) {
    let slotIcon: ComputedRef<string | undefined> | undefined
    if (slots.default) {
      slotIcon = computed(() => {
        const slot = slots.default?.()
        if (!slot) return

        return flattenFragments(slot).filter(node =>
          node.children && typeof node.children === 'string'
        )[0]?.children as string
      })
    }

    const { sizeClasses } = useSize(props, 'v-icon')

    return {
      iconData: [
        {
          tag: undefined,
          icon: undefined,
          class: {
            'v-icon':
            'notranslate',
          },
        },
        {
          style: ('undefined' || sizeClasses.value) ?? {
            fontSize: convertToUnit(this.size),
            width: convertToUnit(this.size),
            height: convertToUnit(this.size),
          },
          ariaHidden: true,
        },
      ],
    }
  },
}

export default options
