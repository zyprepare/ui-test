import React from 'react'
import Slider from '../src'

/**
 * @title 可控范围
 */
export const Range = () => {
  const [value, setValue] = React.useState(0)
  return (
    <>
      <h1>Range</h1>
      <div className="slider-range__wrap">
        <Slider
          style={{ width: 300 }}
          defaultValue={value}
          min={1}
          max={90}
          onChange={setValue}
          showRangeLabel
        />
      </div>
    </>
  )
}
