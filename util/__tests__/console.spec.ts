import { consoleWarn, consoleError } from '../console'

describe('console', () => {
  it('should generate a warning', () => {
    expect(consoleWarn('foo')).toContain('[Vuetify] foo')

    expect(consoleWarn('bar', { _isVue: true, $options: { name: 'baz' } })).toContain('[Vuetify] bar\n\n(found in <Baz>)')
  })

  it('should generate an error', () => {
    expect(consoleError('foo')).toContain('[Vuetify] foo')

    expect(consoleError('bar', { _isVue: true, $options: { name: 'baz' } })).toContain('[Vuetify] bar\n\n(found in <Baz>)')
  })
})
