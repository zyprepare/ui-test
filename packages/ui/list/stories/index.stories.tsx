import React from 'react'
import List from '../src'

export * from './basic.stories'
export * from './pagination.stories'
export * from './no-split.stories'
export * from './action.stories'
export * from './empty.stories'
export * from './no-border.stories'

export default {
  title: 'Data Display/List',
  component: List,
  decorators: [(story: Function) => <div>{story()}</div>],
}
