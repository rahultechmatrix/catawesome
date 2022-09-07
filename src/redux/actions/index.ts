import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { CatReducer, CatReducerState } from '../../Reducers/CatReducer';
export interface RootReducerState {
  catReducer: CatReducerState;
}
export const rootReducer = combineReducers({
  catReducer: CatReducer,

});
let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
