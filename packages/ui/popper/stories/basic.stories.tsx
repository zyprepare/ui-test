import React from 'react'
import Popper from '../src'
import Button from '@hi-ui/button'

/**
 * @title 基础用法
 */
export const Basic = () => {
  const [btnRef, setBtnRef] = React.useState(null)
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <h1>Basic</h1>
      <div className="popper-basic__wrap">
        <Button ref={setBtnRef} onClick={() => setVisible(true)}>
          Open
        </Button>
        <Popper
          visible={visible}
          attachEl={btnRef}
          onClose={() => {
            console.log('onClose')
            setVisible(false)
          }}
        >
          The content of the Popper.
        </Popper>
      </div>
    </>
  )
}
