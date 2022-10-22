import React from 'react'

export * from './basic.stories'

export default {
  title: 'Provider',
  decorators: [(story: Function) => <div>{story()}</div>],
}
