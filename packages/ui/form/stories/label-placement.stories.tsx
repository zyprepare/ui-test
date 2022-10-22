import React from 'react'
import Form, { FormHelpers } from '../src'
import Input from '@hi-ui/input'

/**
 * @title 对齐方式
 * @desc 表单项较少，对应标题字数易对齐工整
 */
export const LabelPlacement = () => {
  const FormItem = Form.Item
  const FormSubmit = Form.Submit

  const formRef = React.useRef<FormHelpers>(null)

  return (
    <>
      <h1>LabelPlacement</h1>
      <div className="form-label-placement__wrap">
        <div>
          <h2>左对齐</h2>
          <div>
            <Form
              innerRef={formRef}
              initialValues={{ productCode: '', productName: '' }}
              labelWidth="100"
              labelPlacement="left"
            >
              <FormItem required={true} label="编码" field="productCode" valueType="string">
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem required={true} label="产品名称" field="productName" valueType="string">
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem label="" field="productName" valueType="string">
                <FormSubmit
                  type="primary"
                  onClick={() => {
                    console.log('Get form value:', formRef.current.getFieldsValue())
                  }}
                >
                  提交
                </FormSubmit>
              </FormItem>
            </Form>
            <br />
          </div>
        </div>

        <div>
          <h2>右对齐</h2>
          <div>
            <Form
              innerRef={formRef}
              initialValues={{ productCode: '', productName: '' }}
              labelWidth="100"
              labelPlacement="right"
            >
              <FormItem required={true} label="编码" field="productCode" valueType="string">
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem required={true} label="产品名称" field="productName" valueType="string">
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem label="" field="productName" valueType="string">
                <FormSubmit
                  type="primary"
                  onClick={() => {
                    console.log('Get form value:', formRef.current.getFieldsValue())
                  }}
                >
                  提交
                </FormSubmit>
              </FormItem>
            </Form>
            <br />
          </div>
        </div>

        <div>
          <h2>顶对齐</h2>
          <div>
            <Form
              innerRef={formRef}
              initialValues={{ productCode: '', productName: '' }}
              labelWidth="100"
              labelPlacement="top"
            >
              <FormItem required={true} label="编码" field="productCode" valueType="string">
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem required={true} label="产品名称" field="productName" valueType="string">
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem label="" field="productName" valueType="string">
                <FormSubmit
                  type="primary"
                  onClick={() => {
                    console.log('Get form value:', formRef.current.getFieldsValue())
                  }}
                >
                  提交
                </FormSubmit>
              </FormItem>
            </Form>
            <br />
          </div>
        </div>
      </div>
    </>
  )
}
