import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import UsersContainer from './components/UsersContainer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import userReducer from './store/reducer/user';

const rootReducer = combineReducers({
  user: userReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App () {
  return (
    <Provider store={store}>
      <div className='App' style={{color: 'white'}}>
        <UsersContainer />
      </div>
    </Provider>
  )
}

export default App
