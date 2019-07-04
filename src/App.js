import React from 'react';
import './App.css';
import StickyNotes from './components/StickyNotes';
import {Provider} from 'react-redux';
import store from './redux/store';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import StickyBoard from './components/StickyBoard';

function App() {
  return (
    <div className="stick-note-area" >
      <Provider store={store}>
        <BrowserRouter>
          <Switch><Route exact path="/" component={StickyNotes}></Route>
          <Route path="/newBoard" component={StickyBoard}></Route></Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
