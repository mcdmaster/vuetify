import { getCurrentInstance } from 'vue'
import { VNode } from 'vue'

export function useRender (render: () => VNode): void {
  const vm = getCurrentInstance() as any
  vm.render = render
}
