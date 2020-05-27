import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import { getAllFilters, changeSearchPhrase, changeTripDurationFrom, changeTripDurationTo, addTripTag, removeTripTag } from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  // TODO - add more dispatchers for other filters
  changeTripDurationFrom: (type, value) => dispatch(changeTripDurationFrom(type, value)),
  changeTripDurationTo: (type, value) => dispatch(changeTripDurationTo(type, value)),
  addTripTag: tag => dispatch(addTripTag(tag)),
  removeTripTag: tag => dispatch(removeTripTag(tag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
