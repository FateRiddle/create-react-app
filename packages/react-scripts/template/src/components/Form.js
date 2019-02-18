import React from 'react';
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;

function MyForm({ formData = [], title = '', form, id, add, edit }) {
  const isNew = id === 'new';
  const goBack = () => window.history.back();
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) return;
      console.log('Received values of form: ', values);
      const onSubmit = isNew ? add : edit;
      Promise.resolve(onSubmit(values)).then(goBack);
    });
  };
  return (
    <div className="center" style={{ maxWidth: 800 }}>
      <div className="f5 black mb2">
        {isNew ? '新建' + title : '编辑' + title}
      </div>
      <Form>
        {formData.map(d => (
          <FormItem
            style={{ display: d.title ? 'inherit' : 'none' }}
            label={d.title}
            key={d.key}
          >
            {form.getFieldDecorator(d.key, {
              initialValue: d.value,
              rules:
                d.title && d.required !== false
                  ? [
                      {
                        required: true,
                        message: '请填写',
                      },
                    ]
                  : [],
            })(<Input placeholder={d.placeholder || ''} />)}
          </FormItem>
        ))}
      </Form>
      <div className="flex justify-end">
        <Button onClick={goBack} className="mr3">
          返回
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
      </div>
    </div>
  );
}

export default Form.create()(MyForm);
