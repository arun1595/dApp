import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Select from 'antd/lib/select';
import Popover from 'antd/lib/popover';
import React from 'react';
import { getExchangeObj } from './ExchangeSources';

import 'antd/lib/form/style';
import 'antd/lib/icon/style';
import 'antd/lib/select/style';
import 'antd/lib/popover/style';

const FormItem = Form.Item;
const Option = Select.Option;

const Hint = props => (
  <Popover
    content={props.hint}
    title={'More about `' + props.hintTitle + '`'}
    trigger="click"
  >
    <Icon type="question-circle-o" style={{ cursor: 'pointer' }} />
  </Popover>
);

class SelectTokenField extends React.Component {
  constructor() {
    super();
    this.state = { pairs: [] };
    this.updateList = this.updateList.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.exchange !== newProps.exchange) {
      this.setState({ pairs: [] });
      this.props.onSelect({
        contractName: '',
        oracleQuery: '',
        priceDecimalPlaces: '',
        priceCap: '',
        priceFloor: '',
        qtyMultiplier: '',
        oracleDataSource: ''
      });
      getExchangeObj(newProps.exchange)
        .fetchList()
        .subscribe(this.updateList);
    }
  }

  updateList(symbols) {
    this.setState({ pairs: symbols });
  }

  handleSelect(e) {
    const exchange = getExchangeObj(this.props.exchange);
    const symbol = this.state.pairs[e];
    this.props.onSelect({
      contractName: this.genContractName(symbol),
      symbolName: symbol.symbol,
      oracleQuery: exchange.genOracleQuery(symbol),
      price: symbol.price * 1.0, // force number
      priceDecimalPlaces: symbol.priceDecimalPlaces,
      priceCap: symbol.price * 1.5,
      priceFloor: symbol.price * 0.5,
      qtyMultiplier: 10 ** (18 - symbol.priceDecimalPlaces),
      oracleDataSource: 'URL'
    });
  }

  genContractName(symbol) {
    return `${this.props.exchange}_${symbol.symbol}_${
      symbol.quoteAsset
    }_${Date.now()}`;
  }

  componentDidMount() {
    getExchangeObj(this.props.exchange)
      .fetchList()
      .subscribe(this.updateList);
  }

  render() {
    const { name, form, initialValue, showHint } = this.props;
    const { getFieldDecorator } = form;
    const fieldSettings = {
      label: 'Select ETH based pair',
      extra: 'Available ETH based pairs from exchange'
    };

    const rules = [
      {
        required: true,
        message: 'Please select a token pairs'
      }
    ];
    const label = (
      <span>
        {fieldSettings.label}{' '}
        {showHint && (
          <Hint hint={fieldSettings.extra} hintTitle={fieldSettings.label} />
        )}
      </span>
    );
    return (
      <FormItem label={label}>
        {getFieldDecorator(name, {
          initialValue,
          rules
        })(
          <Select onSelect={this.handleSelect}>
            {this.state.pairs.map((symbol, index) => (
              <Option key={index} value={index}>
                {symbol.symbol}
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
    );
  }
}

export default SelectTokenField;
