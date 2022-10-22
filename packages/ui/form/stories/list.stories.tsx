import React from 'react'
import Form from '../src'
import Input from '@hi-ui/input'
import Button from '@hi-ui/button'

/**
 * @title 动态表单组
 * @desc 动态 Form 删减表单组
 */
export const List = () => {
  const FormItem = Form.Item
  const FormList = Form.List

  return (
    <>
      <h1>List</h1>
      <div className="form-list__wrap">
        <Form
          initialValues={{ testInput: 'testInput', testInput2: 'testInput2' }}
          labelWidth={110}
          rules={{
            testInput: [
              {
                // name: 'max',
                // strategy: 10,
                max: 10,
                message: 'max is 10',
              },
            ],
            testInput2: [
              {
                // name: 'required',
                // strategy: true,
                required: true,
                message: 'testInput2 is required',
              },
            ],
          }}
        >
          <FormItem field="testInput" valueType="string" label="供应商">
            <Input />
          </FormItem>

          <FormItem field="testInput2" valueType="string" label="供应渠道">
            <Input />
          </FormItem>

          <FormList name="testList">
            {(fields, { add, remove, insertBefore, swap, move }) => {
              return (
                <div>
                  {fields.map((field, index) => {
                    return (
                      <div key={index}>
                        <FormItem
                          field={['testList', index, 'username']}
                          valueType="string"
                          label={`材料名称${index + 1}`}
                        >
                          <Input />
                        </FormItem>

                        <FormItem
                          field={['testList', index, 'password']}
                          valueType="string"
                          label={`材料颜色${index + 1}`}
                        >
                          <Input />
                        </FormItem>

                        <FormItem field={null} valueType={null}>
                          <div>
                            <Button type="danger" onClick={() => remove(index)}>
                              删除
                            </Button>

                            <Button
                              onClick={() => insertBefore(index, { username: '', password: '' })}
                            >
                              动态插入（在该组之前插入）
                            </Button>

                            <Button onClick={() => move(index, 0)}>
                              移到（移到数组索引 0 位置）
                            </Button>
                          </div>
                        </FormItem>
                      </div>
                    )
                  })}
                  <Button onClick={() => add({ username: '', password: '' })}>
                    动态添加成组表单
                  </Button>
                </div>
              )
            }}
          </FormList>
        </Form>
      </div>
    </>
  )
}
