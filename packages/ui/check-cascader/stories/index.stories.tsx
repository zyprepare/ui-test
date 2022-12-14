import React from 'react'
import CheckCascader from '../src'

export * from './basic.stories'
export * from './disabled.stories'
export * from './search.stories'
export * from './select-change.stories'
// export * from './nowrap.stories'
export * from './dynamic.stories'
export * from './display-render.stories'
// export * from './flatted.stories'

export default {
  title: 'Data Input/CheckCascader',
  component: CheckCascader,
  decorators: [(story: Function) => <div>{story()}</div>],
}
