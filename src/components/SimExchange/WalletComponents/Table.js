import React, { Component, Fragment } from 'react';
import Table from 'antd/lib/table';
import Row from 'antd/lib/row';
import columns from './columns';
import wallet from '../data/wallet';

import 'antd/lib/table/style';
import 'antd/lib/row/style';
import './table.css';

class BuyTable extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: 1
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({
      inputValue: value
    });
  }

  render() {
    return (
      <Fragment>
        <Row gutter={24}>
          <h1 className="table-header-title">Transfer</h1>
          <Table dataSource={wallet} columns={columns} />
        </Row>
      </Fragment>
    );
  }
}

export default BuyTable;
