import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';

class OrderForm extends React.Component {

  static propTypes = {
    tripCost: PropTypes.node,
    options: PropTypes.object,
  }

  render() {
    const { tripCost, options } = this.props;
    return (
      <Row>
        {pricing.map(option =>
          <Col md={4} key={option.id}>
            <OrderOption {...option}>  </OrderOption>
          </Col>
        )}
        <Col xs={12}>
          <OrderSummary tripCost={tripCost} options={options} />
        </Col>
      </Row>

    );
  }
}

export default OrderForm;