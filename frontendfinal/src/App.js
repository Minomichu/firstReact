import React, { Component } from 'react';
import { BrowserRouter, Route, Switch/*, Link*/ } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import AddWish from './components/AddWish'
import Margin from './components/Margin';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          
          <Margin />
          <div id="centerContent">
            <div id="surroundingBorder">
              <Header />
         
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/addwish' component={AddWish} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
