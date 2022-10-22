import React from 'react'
import Radio from '../src'
import Button from '@hi-ui/button'

/**
 * @title 受控
 */
export const Controlled = () => {
  const [checked, setChecked] = React.useState(false)

  return (
    <>
      <h1>Controlled</h1>
      <div className="radio-controlled__wrap">
        <Button onClick={() => setChecked((prev) => !prev)}>Toggle</Button>
        <div style={{ marginTop: 10 }}>
          <Radio
            checked={checked}
            onChange={(evt) => {
              console.log('onChange', evt)
              setChecked(evt.target.checked)
            }}
          >
            Radio
          </Radio>
        </div>
      </div>
    </>
  )
}
