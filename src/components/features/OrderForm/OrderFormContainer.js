import { connect } from 'react-redux';
import OrderForm from './OrderForm.js';
import { getOrderOptions, setOrderOption } from '../../../redux/orderRedux';

const mapStateToProps = (state) => ({ 
  options: getOrderOptions(state), //dlaczego  options, a nie order . nie ma propsow, dlatego ze 
});

const mapDispatchToProps = (dispatch) => ({
  setOrderOption: option => dispatch(setOrderOption(option)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm); //odpowiedzialne za połączenie komponenta App z magazynem