import React from 'react';
import { InputNumber, Form } from 'antd';

const { Item } = Form;
const formLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};

interface TippingFormProps {
  onChange: (values: any) => void;
}

function TippingForm({ onChange }: TippingFormProps) {
  const [form] = Form.useForm();
  return (
    <Form
      {...formLayout}
      layout="vertical"
      name="tippigForm"
      onValuesChange={onChange}
      form={form}
    >
      <Item name="amount">
        <InputNumber
          prefix="$"
          placeholder="Enter tipping amount"
          min={0}
          style={{ width: '100%' }}
        />
      </Item>
    </Form>
  );
}
export default TippingForm;
