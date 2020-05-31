import React from 'react';
import styles from './OrderOption.scss';
//import PropTypes from 'prop-types';

class OrderOption extends React.Component {

  static propTypes = {
    
  }

  render() {
    
    return ( 
      < div className={styles.component} > 
        <h3  className={styles.title}> Car Rental</h3>
      </div>
    );
  }
}

export default OrderOption;