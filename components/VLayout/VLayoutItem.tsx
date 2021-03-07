// Composables
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'

// Utilities
import Vue, { toRef, computed } from 'vue'

// Types
import { Prop } from 'vue'

const options: ThisType<typeof Vue> = {
  name: 'VLayoutItem',

  props: {
    position: {
      type: String,
      required: true,
    } as Prop<'top' | 'right' | 'bottom' | 'left'>,
    ...makeLayoutItemProps(),
  },

  setup (props: any, { slots }: any) {
    const styles = useLayoutItem(
      props.name,
      toRef(props, 'priority'),
      computed(() => props.position ?? 'left'),
      toRef(props, 'size')
    )

    return () => (
      <div style={ styles.value }>
        { slots.default?.() }
      </div>
    )
  },
}

export default options
