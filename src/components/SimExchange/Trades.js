import React, { Component } from 'react';
import Layout from 'antd/lib/layout';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import TradeContainer from './TradeContainer';

import 'antd/lib/layout/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';
import './Trades.css';

const { Content } = Layout;

class Trades extends Component {
  render() {
    return (
      <Layout style={{ background: '#FFF' }}>
        <Content style={{ background: '#FFF' }}>
          <Row type="flex" justify="space-around" gutter={24}>
            <Col span={12}>
              <TradeContainer
                title="bid"
                market="ETX"
                tradeOrder={this.props.tradeOrder}
                data={this.props.bids}
              />
            </Col>
            <Col span={12}>
              <TradeContainer
                title="ask"
                market="ETX"
                tradeOrder={this.props.tradeOrder}
                data={this.props.asks}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default Trades;
