import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Steps from 'antd/lib/steps';

import React, { Component } from 'react';

import StepAnimation from '../StepAnimation';
import showMessage from '../message';
import {
  DataSourceStep,
  DeployStep,
  ExpirationStep,
  NameContractStep,
  PricingStep
} from './Steps';

import 'antd/lib/col/style';
import 'antd/lib/row/style';
import 'antd/lib/steps/style';
const Step = Steps.Step;

const parentColLayout = {
  lg: {
    span: 18
  },
  sm: {
    span: 22
  },
  xs: {
    span: 24
  }
};

/**
 * Component for Guided Deployment of Contracts
 *
 */
class GuidedDeployment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      transitionDirection: 'next',
      contractName: '',
      baseTokenAddress: '',
      priceFloor: '',
      priceCap: '',
      priceDecimalPlaces: '',
      qtyMultiplier: '',
      expirationTimeStamp: '',
      oracleDataSource: '',
      oracleQuery: ''
    };
  }

  toNextStep() {
    this.setState({
      step: this.state.step + 1,
      transitionDirection: 'next'
    });
  }

  toPrevStep() {
    this.setState({
      step: this.state.step - 1,
      transitionDirection: 'prev'
    });
  }

  onFailSubmit() {
    this.setState({
      step: 0,
      transitionDirection: 'prev'
    });
  }

  render() {
    const currentStep = this.state.step;
    const { gas, initialValues } = this.props;

    const steps = [
      <NameContractStep
        key="0"
        onNextClicked={this.toNextStep.bind(this)}
        updateDeploymentState={this.setState.bind(this)}
        {...this.state}
      />,

      <DataSourceStep
        key="3"
        onPrevClicked={this.toPrevStep.bind(this)}
        onNextClicked={this.toNextStep.bind(this)}
        updateDeploymentState={this.setState.bind(this)}
        initialValues={initialValues}
        {...this.state}
      />,

      <PricingStep
        key="1"
        onPrevClicked={this.toPrevStep.bind(this)}
        onNextClicked={this.toNextStep.bind(this)}
        updateDeploymentState={this.setState.bind(this)}
        {...this.state}
      />,

      <ExpirationStep
        key="2"
        gas={gas}
        location={this.props.location}
        onPrevClicked={this.toPrevStep.bind(this)}
        onNextClicked={this.toNextStep.bind(this)}
        updateDeploymentState={this.setState.bind(this)}
        {...this.state}
      />,

      <DeployStep
        key="4"
        deployContract={() => {
          this.props.onDeployContract(this.state);
        }}
        showErrorMessage={showMessage.bind(showMessage, 'error')}
        showSuccessMessage={showMessage.bind(showMessage, 'success')}
        onFailSubmit={this.onFailSubmit.bind(this)}
        loading={this.props.loading}
        contract={this.props.contract}
        error={this.props.error}
      />
    ];

    return (
      <div className="page">
        <Row type="flex" justify="center">
          <Col {...parentColLayout}>
            <Steps current={currentStep} style={{ marginBottom: '40px' }}>
              <Step title="Name" />
              <Step title="Data Source" />
              <Step title="Pricing" />
              <Step title="Expiration" />
              <Step title="Deploy" />
            </Steps>
            <StepAnimation direction={this.state.transitionDirection}>
              {steps.filter((step, index) => currentStep === index)}
            </StepAnimation>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GuidedDeployment;
