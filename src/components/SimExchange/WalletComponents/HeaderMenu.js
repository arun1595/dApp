import React, { Component } from 'react';
import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Modal from 'antd/lib/modal';
import Form from './Form';

import 'antd/lib/card/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';
import 'antd/lib/modal/style';
import './header-menu.css';

class HeaderMenu extends Component {
  constructor() {
    super();

    this.state = {
      amount: {},
      transaction: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  onSubmit(amount) {
    this.setState({ amount });
  }

  showModal() {
    this.setState({ modal: true });
  }

  handleCancel() {
    this.setState({ modal: false });
  }

  handleOk() {
    this.setState({ modal: false });
  }

  render() {
    const { amount } = this.state;

    return (
      <Row gutter={24} className="header-menu">
        <Col span={12}>
          <Card title="Deposit ETX">
            <Form
              onSubmit={this.onSubmit}
              showModal={this.showModal}
              type="deposit"
              amount={amount}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Withdraw ETX">
            <Form
              onSubmit={this.onSubmit}
              showModal={this.showModal}
              type="withdraw"
              amount={amount}
            />
          </Card>
        </Col>
        <Modal
          title="Confirmation required"
          visible={this.state.modal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <h3>
            Are you sure you want to {amount.type} {amount.number} ETX?
          </h3>
        </Modal>
      </Row>
    );
  }
}

export default HeaderMenu;
