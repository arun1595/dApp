import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import React from 'react';

import 'antd/lib/form/style';
import 'antd/lib/input/style';

const FormItem = Form.Item;

const getFieldSettings = validators => ({
  rules: [
    {
      required: true,
      message: 'Please enter MARKET contract address'
    },
    {
      validator: validators.ethAddressValidator
    }
  ]
});

function FindContractField(props) {
  const { name, form, validators } = props;
  const { getFieldDecorator } = form;

  const fieldSettings = getFieldSettings(validators);

  const rules = fieldSettings.rules;
  const label = 'MARKET Contract Address';

  return (
    <FormItem label={<span>{label}</span>}>
      {getFieldDecorator(name, {
        rules
      })(<Input />)}
    </FormItem>
  );
}

export default FindContractField;
