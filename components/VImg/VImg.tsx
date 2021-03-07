// Styles
import './VImg.sass'

// Directives
import intersect from '../../directives/intersect'

// Types
import Vue, { h, VNode } from 'vue'

// Components
import VResponsive from '../VResponsive/VResponsive'

// Mixins
import Themeable, { functionalThemeClasses } from '../../mixins/themeable'

// Utils
// import mixins from '../../util/mixins'
import mergeData from '../../util/propsFactory'
import { consoleWarn } from '../../util/console'

// not intended for public use, this is passed in by vuetify-loader
export interface srcObject {
  src: string
  srcset?: string
  lazySrc: string
  aspect: number
}

const hasIntersect = typeof window !== 'undefined' && 'IntersectionObserver' in window

/* @vue/component */
const options: ThisType<typeof Vue> = {

  name: 'VImg',
  components: {
    VResponsive,
    themeable: Themeable,
  },

  directives: { intersect },

  props: {
    alt: String,
    contain: Boolean,
    eager: Boolean,
    gradient: String,
    lazySrc: String,
    options: {
      type: Object,
      // For more information on types, navigate to:
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      default: () => ({
        root: undefined,
        rootMargin: undefined,
        threshold: undefined,
      }),
    },
    position: {
      type: String,
      default: 'center center',
    },
    sizes: String,
    src: {
      type: [String, Object],
      default: '',
    },
    srcset: String,
    transition: {
      type: [Boolean, String],
      default: 'fade-transition',
    },
  },

  data () {
    return {
      currentSrc: '', // Set from srcset
      image: null as HTMLImageElement | null,
      isLoading: true,
      calculatedAspectRatio: undefined as number | undefined,
      naturalWidth: undefined as number | undefined,
      hasError: false,
    }
  },

  computed: {
    computedAspectRatio (): number {
      return Number(this.normalisedSrc.aspect || this.calculatedAspectRatio)
    },
    normalisedSrc (): srcObject {
      return this.src && typeof this.src === 'object'
        ? {
          src: this.src,
          srcset: this.srcset || this.srcset,
          lazySrc: this.lazySrc || this.src.lazySrc,
          aspect: Number(this.aspectRatio || this.src.aspect),
        } : {
          src: this.src,
          srcset: this.srcset,
          lazySrc: this.lazySrc,
          aspect: Number(this.aspectRatio || 0),
        }
    },
    __cachedImage (): VNode | [] {
      if (!(this.normalisedsrc || this.normalisedSrc.lazySrc || this.gradient)) return []

      const backgroundImage: string[] = []
      const src = this.isLoading ? this.normalisedSrc.lazySrc : this.currentSrc

      if (this.gradient) backgroundImage.push(`linear-gradient(${this.gradient})`)
      if (src) backgroundImage.push(`url("${src}")`)

      const image = this.$createElement('div', {
        staticClass: 'v-image__image',
        class: {
          'v-image__image--preload': this.isLoading,
          'v-image__image--contain': this.contain,
          'v-image__image--cover': !this.contain,
        },
        style: {
          backgroundImage: backgroundImage.join(', '),
          backgroundPosition: this.position,
        },
        key: +this.isLoading,
      })

      /* istanbul ignore if */
      if (!this.transition) return image

      return this.$createElement('transition', {
        attrs: {
          name: this.transition,
          mode: 'in-out',
        },
      }, [image])
    },
  },

  watch: {
    src () {
      // Force re-init when src changes
      if (!this.isLoading) this.init(undefined, undefined, true)
      else this.loadImage()
    },
    '$vuetify.breakpoint.width': 'getSrc',
  },

  mounted () {
    this.init()
  },

  methods: {
    init (
      entries?: IntersectionObserverEntry[],
      observer?: IntersectionObserver,
      isIntersecting?: boolean
    ) {
      // If the current browser supports the intersection
      // observer api, the image is not observable, and
      // the eager prop isn't being used, do not load
      if (
        hasIntersect &&
        !isIntersecting &&
        !this.eager
      ) return

      if (this.normalisedSrc.lazySrc) {
        const lazyImg = new Image()
        lazyImg.src = this.normalisedSrc.lazySrc
        this.pollForSize(lazyImg, null)
      }
      /* istanbul ignore else */
      if (this.normalisedsrc) this.loadImage()
    },
    onLoad () {
      this.getSrc()
      this.isLoading = false
      this.$emit('load', this.src)
    },
    onError () {
      this.hasError = true
      this.$emit('error', this.src)
    },
    getSrc () {
      /* istanbul ignore else */
      if (this.image) this.currentSrc = this.image.currentSrc || this.image.src
    },
    loadImage () {
      const image = new Image()
      this.image = image

      image.onload = () => {
        /* istanbul ignore if */
        if (image.decode) {
          image.decode().catch((err: DOMException) => {
            consoleWarn(
              `Failed to decode image, trying to render anyway\n\n` +
              `src: ${this.normalisedsrc}` +
              (err.message ? `\nOriginal error: ${err.message}` : ''),
              this
            )
          }).then(this.onLoad)
        } else {
          this.onLoad()
        }
      }
      image.onerror = this.onError

      this.hasError = false
      image.src = this.normalisedsrc
      this.sizes && (image.sizes = this.sizes)
      this.normalisedsrcset && (image.srcset = this.normalisedsrcset)

      this.aspectRatio || this.pollForSize(image)
      this.getSrc()
    },
    pollForSize (img: HTMLImageElement, timeout: number | null = 100) {
      const poll = () => {
        const { naturalHeight, naturalWidth } = img

        if (naturalHeight || naturalWidth) {
          this.naturalWidth = naturalWidth
          this.calculatedAspectRatio = naturalWidth / naturalHeight
        } else {
          timeout != null && !this.hasError && setTimeout(poll, timeout)
        }
      }

      poll()
    },
    genContent () {
      const content: VNode = this.VResponsive
      if (this.naturalWidth) {
        this._b(this.content.querySelector('data')!, 'div', {
          style: { width: `${this.naturalWidth}px` },
        }
        )
      }

      return content
    },
    __genPlaceholder (): VNode | void {
      if (this.$slots.placeholder) {
        const placeholder = this.isLoading
          ? [this.$createElement('div', {
            staticClass: 'v-image__placeholder',
          }, this.$slots.placeholder)]
          : []

        if (!this.transition) return placeholder[0]

        return this.$createElement('transition', {
          props: {
            appear: true,
            name: this.transition,
          },
        }, placeholder)
      }
    },
  },

  render (h) {
    const data: typeof mergeData = {
      staticClass: 'v-image',

      attrs: {
        ariaLabel: this.alt,
        role: this.alt ? 'img' : 'undefined',
      },

      class: { functionalThemeClasses },
      extends: { Themeable, VResponsive },
      // Only load intersect directive if it
      // will work in the current browser.
      intersect: () => !hasIntersect ? 'undefined' : [{
        name: 'intersect',
        modifiers: { once: true },
        value: {
          handler: this.init,
          options,
        },
      }],

      VResponsive: () => [{
        name: 'vResponsive',
        this: Node = {
          ...this.tag,
          ...this.data,
          children: {
            cachedSize: {},
            cachedImage: {},
            genPlaceholder: {},
            genContent: {},
          },
        },
      }],
    }
  },
}
export default options
