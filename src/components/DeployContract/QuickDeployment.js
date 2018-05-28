import Alert from 'antd/lib/alert';
import Button from 'antd/lib/button';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Spin from 'antd/lib/spin';
import React, { Component } from 'react';

import Loader from '../Loader';
import Field from './DeployContractField';
import DeployContractSuccess from './DeployContractSuccess';
import GasPriceField from '../GasPriceField';

import 'antd/lib/alert/style';
import 'antd/lib/button/style';
import 'antd/lib/col/style';
import 'antd/lib/form/style';
import 'antd/lib/row/style';
import 'antd/lib/spin/style';

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
    span: 11
  },
  xs: {
    span: 24
  }
};

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

/**
 * Component for deploying Contracts Quickly.
 *
 */
class QuickDeployment extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.loading && !nextProps.loading) {
      if (nextProps.error) {
        // We had an error
        this.props.showErrorMessage(
          `There was an error deploying the contract: ${nextProps.error}`,
          8
        );
      } else if (nextProps.contract) {
        // Contract was deployed
        this.props.showSuccessMessage(
          DeployContractSuccess({ contract: nextProps.contract }),
          5
        );
      }
    }
  }

  handleReset(event) {
    event.preventDefault();
    this.props.form.resetFields();
  }

  handleDeploy(event) {
    event.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      const values = {
        ...fieldsValue,
        expirationTimeStamp: Math.floor(
          fieldsValue['expirationTimeStamp'].valueOf() / 1000
        )
      };

      this.props.onDeployContract(values);
    });
  }

  isSubmitDisabled() {
    if (this.props.loading) return true;

    const errors = this.props.form.getFieldsError();
    return Object.keys(errors).some(field => errors[field]);
  }

  handleModeSwitching(e) {
    e.preventDefault();
    this.props.switchMode('guided');
  }

  render() {
    const { form, gas, initialValues, loading, network } = this.props;

    const quickForm = (
      <div>
        <Alert
          style={{ textAlign: 'center' }}
          banner
          type="info"
          showIcon={false}
          message={
            <span>
              First time deploying a Contract? Try the{' '}
              <a
                className="switch-mode-link"
                href={this.props.guidedModeUrl}
                onClick={this.handleModeSwitching.bind(this)}
              >
                guided mode
              </a>.
            </span>
          }
        />
        <div className="page">
          <Form
            onSubmit={this.handleDeploy.bind(this)}
            layout="vertical"
            style={{ overflowX: 'hidden' }}
          >
            <ContractFormRow>
              <ContractFormCol>
                <Field
                  name="contractName"
                  initialValue={initialValues.contractName}
                  form={form}
                  showHint
                />
              </ContractFormCol>

              <ContractFormCol>
                <Field
                  name="baseTokenAddress"
                  initialValue={initialValues.baseTokenAddress}
                  form={form}
                  showHint
                />
              </ContractFormCol>
            </ContractFormRow>

            <ContractFormRow>
              <ContractFormCol>
                <Field
                  name="priceFloor"
                  initialValue={
                    isNaN(initialValues.priceFloor)
                      ? ''
                      : parseInt(initialValues.priceFloor, 10)
                  }
                  form={form}
                  showHint
                />
              </ContractFormCol>

              <ContractFormCol>
                <Field
                  name="priceCap"
                  initialValue={
                    isNaN(initialValues.priceCap)
                      ? ''
                      : parseInt(initialValues.priceCap, 10)
                  }
                  form={form}
                  showHint
                />
              </ContractFormCol>
            </ContractFormRow>

            <ContractFormRow>
              <ContractFormCol>
                <Field
                  name="priceDecimalPlaces"
                  initialValue={
                    isNaN(initialValues.priceDecimalPlaces)
                      ? ''
                      : parseInt(initialValues.priceDecimalPlaces, 10)
                  }
                  form={form}
                  showHint
                />
              </ContractFormCol>

              <ContractFormCol>
                <Field
                  name="qtyMultiplier"
                  initialValue={
                    isNaN(initialValues.qtyMultiplier)
                      ? ''
                      : parseInt(initialValues.qtyMultiplier, 10)
                  }
                  form={form}
                  showHint
                />
              </ContractFormCol>
            </ContractFormRow>

            <ContractFormRow>
              <ContractFormCol>
                <Field
                  name="expirationTimeStamp"
                  initialValue={initialValues.expirationTimeStamp}
                  form={form}
                  showHint
                />
              </ContractFormCol>

              <ContractFormCol>
                <Field
                  name="oracleDataSource"
                  initialValue={initialValues.oracleDataSource}
                  form={form}
                  showHint
                />
              </ContractFormCol>
            </ContractFormRow>

            <ContractFormRow>
              <ContractFormCol>
                <Field
                  name="oracleQuery"
                  initialValue={initialValues.oracleQuery}
                  form={form}
                  showHint
                />
              </ContractFormCol>
            </ContractFormRow>

            <ContractFormRow>
              <ContractFormCol>
                <GasPriceField
                  form={form}
                  gaslimit={gas}
                  location={this.props.location}
                  network={network}
                />
              </ContractFormCol>
            </ContractFormRow>

            <Row type="flex" justify="center">
              <Col {...formButtonLayout}>
                <Button
                  className="submit-button"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={this.isSubmitDisabled()}
                  style={{ width: '100%' }}
                >
                  Deploy Contract
                </Button>
              </Col>
            </Row>

            <Row type="flex" justify="center" style={{ marginTop: '16px' }}>
              <Col {...formButtonLayout}>
                <Button
                  className="reset-button"
                  type="secondary"
                  style={{ width: '100%' }}
                  disabled={loading}
                  onClick={this.handleReset.bind(this)}
                >
                  Reset Form
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );

    const loader = <Loader loading={loading} center={true} />;

    return loading ? (
      <Spin indicator={loader} style={{ maxHeight: '100%', height: '100%' }}>
        {quickForm}
      </Spin>
    ) : (
      quickForm
    );
  }
}

export default Form.create()(QuickDeployment);
