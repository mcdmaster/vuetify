import IconValue from '../components/VIcon/VIcon'

// Utilities
import {
  computed, inject, isRef,
  // Types
  JSXComponent, InjectionKey, Ref,
} from 'vue'

type IconValue = typeof IconValue

export interface IconAliases {
  [name: string]: IconValue
  complete: IconValue
  cancel: IconValue
  close: IconValue
  delete: IconValue
  clear: IconValue
  success: IconValue
  info: IconValue
  warning: IconValue
  error: IconValue
  prev: IconValue
  next: IconValue
  checkboxOn: IconValue
  checkboxOff: IconValue
  checkboxIndeterminate: IconValue
  delimiter: IconValue
  sort: IconValue
  expand: IconValue
  menu: IconValue
  subgroup: IconValue
  dropdown: IconValue
  radioOn: IconValue
  radioOff: IconValue
  edit: IconValue
  ratingEmpty: IconValue
  ratingFull: IconValue
  ratingHalf: IconValue
  loading: IconValue
  first: IconValue
  last: IconValue
  unfold: IconValue
  file: IconValue
  plus: IconValue
  minus: IconValue
}

export interface IconProps {
  tag: string
  icon: IconValue
  disabled?: Boolean
}

type IconComponent = JSXComponent<IconProps>

export interface IconSet {
  component: IconComponent
}

export type IconOptions = {
  defaultSet: string
  aliases?: Partial<IconAliases>
  sets: Record<string, IconSet>
}

type IconInstance = {
  component: IconComponent
  icon: IconValue
}

export const VuetifyIconSymbol: InjectionKey<IconOptions> = Symbol.for('vuetify:icons')

export const makeIconProps: IconValue = {
  icon: {
    type: [String, Object] as IconValue,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
}

export const VComponentIcon: IconValue = {
  name: 'VComponentIcon',

  props: makeIconProps,

  setup (props: any) {
    return () => {
      return (
        <props.tag>
          <props.icon />
        </props.tag>
      )
    }
  },
}

export const VSvgIcon: IconValue = {
  name: 'VSvgIcon',

  inheritAttrs: false,

  props: makeIconProps,

  setup (props: any, { attrs }: any) {
    return () => {
      return (
        <props.tag { ...attrs } style={ null }>
          <svg
            class='v-icon__svg'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            role='img'
            aria-hidden="true"
          >
            <path d={ props.icon as string }></path>
          </svg>
        </props.tag>
      )
    }
  },
}

export const VLigatureIcon: IconValue = {
  name: 'VLigatureIcon',

  props: makeIconProps,

  setup (props: any) {
    return () => {
      return <props.tag>{ props.icon }</props.tag>
    }
  },
}

export const VClassIcon: IconValue = {
  name: 'VClassIcon',

  props: makeIconProps,

  setup (props: any) {
    return () => {
      return <props.tag class={ props.icon }></props.tag>
    }
  },
}

export const defaultSets: IconInstance[] = [
  {
    component: VSvgIcon,
    icon: 'svg',
  },
  {
    component: VClassIcon,
    icon: 'class',
  },
]

// Composables
export const useIcon = (props: Ref<string | undefined> | { icon?: IconValue }) => {
  const icons = inject(VuetifyIconSymbol)

  if (!icons) throw new Error('Missing Vuetify Icons provide!')

  const iconData = computed(() => {
    const iconAlias = isRef(props) ? props.value : props.icon

    if (!iconAlias) throw new Error('Icon value is undefined or null')

    let icon: IconValue | undefined = iconAlias

    if (typeof iconAlias === 'string' && iconAlias.includes('$')) {
      icon = icons.aliases?.[iconAlias.slice(iconAlias.indexOf('$') + 1)]
    }

    if (!icon) throw new Error(`Could not find aliased icon "${iconAlias}"`)

    if (typeof icon !== 'string') {
      return {
        component: VComponentIcon,
        icon,
      }
    }

    const hasSet = icon.includes(':')
    const setName = hasSet ? icon.split(':')[0] : icons.defaultSet
    const iconName = hasSet ? icon.split(':')[1] : icon
    const set = icons.sets[setName ?? icons.defaultSet]

    if (!set) {
      throw new Error(`Could not find icon set "${setName}"`)
    }

    return {
      component: set.component,
      icon: iconName,
    }
  })

  return { ...iconData }
}
