import React, { Component } from 'react';
import Button from 'antd/lib/button';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';

import 'antd/lib/button/style';
import 'antd/lib/col/style';
import 'antd/lib/row/style';
import 'antd/lib/dropdown/style';
import 'antd/lib/icon/style';
import 'antd/lib/menu/style';

class TopBar extends Component {
  render() {
    const { contract, contracts } = this.props;

    const menu = (
      <Menu onClick={e => this.props.onSelectContract(e.item.props.contract)}>
        {contracts &&
          contracts.map(c => (
            <Menu.Item key={c.key} contract={c}>
              {c.CONTRACT_NAME}
            </Menu.Item>
          ))}
      </Menu>
    );

    return (
      <div>
        <Row type="flex" justify="space-between" gutter={24}>
          <Col span={12}>Last Price: 0.00453143 ETH</Col>
          <Col span={12}>
            {contracts && (
              <Dropdown overlay={menu}>
                <Button style={{ marginLeft: 8 }}>
                  {contract ? contract.CONTRACT_NAME : 'Contracts'}{' '}
                  <Icon type="down" />
                </Button>
              </Dropdown>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default TopBar;
