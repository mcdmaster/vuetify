// Styles
import './VMain.sass'

// Composables
import { makeTagProps } from '@/composables/tag'
import { useMain } from '@/composables/layout'
import { useSsrBoot } from '@/composables/ssrBoot'

// Utilities
import makeProps from '@/util/makeProps'
import Vue from 'vue'

const options: ThisType<typeof Vue> = {
  name: 'VMain',

  props: makeProps(makeTagProps({ tag: 'main' })),

  setup (props: any, { slots }: any) {
    const { mainStyles } = useMain()
    const { ssrBootStyles } = useSsrBoot()

    return () => (
      <props.tag
        class="v-main"
        style={[
          mainStyles.value,
          ssrBootStyles.value,
        ]}
      >
        <div class="v-main__wrap">
          { slots.default?.() }
        </div>
      </props.tag>
    )
  },
}

export default options
