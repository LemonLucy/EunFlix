import { configureStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore(rootReducer);

export { store, Provider };
