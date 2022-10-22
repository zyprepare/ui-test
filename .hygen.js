const Path = require('path')

const PROJ_ROOT = __dirname
const resolveApp = (...paths) => Path.resolve(PROJ_ROOT, ...paths)

module.exports = {
  templates: resolveApp('.hygen'),
  helpers: {
    root: () => __dirname,
    uiDir: (to) => resolveApp('packages/ui', to),
    utilsDir: (to) => resolveApp('packages/utils', to),
    hooksDir: (to) => resolveApp('packages/hooks', to),
    camelCase: (function () {
      const cache = {}
      return function (str) {
        if (!str) return ''
        if (cache[str]) return cache[str]

        return (cache[str] = str
          .replace(/-([a-z])/g, (_, i) => i.toUpperCase())
          .replace(/^([a-z])/, (_, i) => i.toUpperCase())
        )
      }
    })(),
    hump: (function () {
      const cache = {}
      return function (str) {
        if (!str) return ''
        if (cache[str]) return cache[str]

        return (cache[str] = str
          .replace(/-([a-z])/g, (_, i) => i.toUpperCase())
        )
      }
    })(),
    capt: (function () {
      const cache = {}
      return function (str) {
        if (!str) return ''
        if (cache[str]) return cache[str]

        return (cache[str] = str
          .replace(/-/g, '_')
          .replace(/([a-z])/g, (_, i) => i.toUpperCase())
        )
      }
    })(),
  },
}
