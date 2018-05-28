import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Form from 'antd/lib/form';
import List from 'antd/lib/list';
import React, { Component } from 'react';

import Loader from '../Loader';
import Field from './FindContractField';
import FindContractSuccess from './FindContractSuccess';

import 'antd/lib/button/style';
import 'antd/lib/card/style';
import 'antd/lib/col/style';
import 'antd/lib/row/style';
import 'antd/lib/form/style';
import 'antd/lib/list/style';

class FindContractForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marketContractAddress: '',
      contract: [],
      keyMap: {
        key: 'Address',
        CONTRACT_NAME: 'Contract Name',
        BASE_TOKEN: 'Base Token',
        BASE_TOKEN_ADDRESS: 'Token Address',
        BASE_TOKEN_SYMBOL: 'Base Token Symbol',
        PRICE_FLOOR: 'Price Floor',
        PRICE_CAP: 'Price Cap',
        PRICE_DECIMAL_PLACES: 'Price Decimal Places',
        QTY_MULTIPLIER: 'Quantity Multiplier',
        ORACLE_QUERY: 'Oracle Query',
        EXPIRATION: 'Expiration time',
        lastPrice: 'Last Price',
        isSettled: 'Is Settled',
        collateralPoolBalance: 'Collateral Pool Balance'
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loading && !nextProps.loading) {
      if (nextProps.error) {
        this.props.showErrorMessage('Contract not found at this address!', 8);
      } else if (nextProps.contract) {
        this.props.showSuccessMessage(
          FindContractSuccess({ contract: nextProps.contract }),
          3
        );
      }
    }
  }

  handleReset(event) {
    event.preventDefault();
    this.props.form.resetFields();
  }

  handleFind(event) {
    event.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      this.props.onFindContract({ ...fieldsValue });
    });
  }

  isSubmitDisabled() {
    if (this.props.loading) return true;

    const errors = this.props.form.getFieldsError();
    return Object.keys(errors).some(field => errors[field]);
  }

  render() {
    return (
      <div className="page">
        <br />
        <Form onSubmit={this.handleFind.bind(this)} layout="vertical">
          <ContractFormRow>
            <ContractFormCol>
              <Field
                name="marketContractAddress"
                validators={this.props.validators}
                form={this.props.form}
              />
            </ContractFormCol>
          </ContractFormRow>

          <Row type="flex" justify="center">
            <Col {...formButtonLayout}>
              <Button
                className="submit-button"
                type="primary"
                htmlType="submit"
                loading={this.props.loading}
                disabled={this.isSubmitDisabled()}
                style={{ width: '100%' }}
              >
                Find Contract
              </Button>
            </Col>
          </Row>

          <Row type="flex" justify="center" style={{ marginTop: '16px' }}>
            <Col {...formButtonLayout}>
              <Button
                className="reset-button"
                type="secondary"
                style={{ width: '100%' }}
                disabled={this.props.loading}
                onClick={this.handleReset.bind(this)}
              >
                Reset Form
              </Button>
            </Col>
          </Row>
          <Loader loading={this.props.loading} center={true} />
        </Form>
        <br />
        {this.props.contract.length > 0 && (
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={this.props.contract}
            renderItem={item => (
              <List.Item>
                <Card title={this.state.keyMap[item.name]}>
                  {item.value.toString()}
                </Card>
              </List.Item>
            )}
            {...formItemColLayout}
          />
        )}
      </div>
    );
  }
}

function ContractFormRow(props) {
  return (
    <Row type="flex" justify="center" gutter={16} {...props}>
      {props.children}
    </Row>
  );
}

function ContractFormCol(props) {
  return (
    <Col {...formItemColLayout} {...props}>
      {props.children}
    </Col>
  );
}

const formButtonLayout = {
  xs: {
    span: 24
  },
  sm: {
    span: 8
  }
};

const formItemColLayout = {
  lg: {
    span: 8
  },
  sm: {
    span: 12
  },
  xs: {
    span: 24
  }
};

export default Form.create()(FindContractForm);
