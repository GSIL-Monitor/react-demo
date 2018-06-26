import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import './style.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

class FormValidate extends Component {
  render() {
    const formList = [{
      label: '姓名',
      prop: 'name',
      rules: [
        { required: true, message: '请输入内容', trigger: 'change' },
        { max: 5, message: '最多5个字符', trigger: 'change' },
        {
          validator: (rule, value, callback) => { // ======划重点======
            const form = this.props.form;
            if (value && value === form.getFieldValue('father')) {
              callback('不能与父亲姓名一致');
            } else {
              callback();
            }
          }, trigger: 'change'
        },
      ],
      component: <Input placeholder="Please input your name" />,
      extra: '请输入最多5个字符，且不能和父亲姓名一样',
    }, {
      label: '昵称',
      prop: 'nick',
      rules: [
        { required: true, message: '请输入内容', trigger: 'change' },
        { max: 3, message: '最多3个字符', trigger: 'change' },
      ],
      component: <Input placeholder="Please input your name" />,
      extra: '请输入最多3个字符',
    }, {
      label: '父亲姓名',
      prop: 'father',
      rules: [
        { required: true, message: '请输入内容', trigger: 'change' },
        { max: 5, message: '最多5个字符', trigger: 'change' },
        {
          validator: (rule, value, callback) => { // ======划重点======
            const form = this.props.form;
            if (value && value === form.getFieldValue('name')) {
              callback('不能与姓名一致');
            } else {
              callback();
            }
          }, trigger: 'change'
        },
      ],
      component: <Input placeholder="Please input your name" />,
      extra: '请输入最多5个字符，且不能和子女姓名一样',
    }];
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="FormValidate">
        <h1>实现表单的关联校验</h1>
        <Form>
          {formList.map(li => (
            <FormItem
              {...formItemLayout}
              key={li.prop}
              label={li.label}
              extra={li.extra}>
              {getFieldDecorator(li.prop, {
                rules: li.rules,
              })(li.component)}
            </FormItem>
          ))}
          <FormItem {...formTailLayout}>
            <Button type="primary" onClick={this.check}>
              Check
          </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(FormValidate);
