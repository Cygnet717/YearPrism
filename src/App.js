import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from'./Components/Header/Header'
import LandingPage from './Components/LandingPage/LandingPage'

function App() {
  return (
    <main className='App'>
      <Header/>
      <Switch>
        <Route exact path={'/'} component={LandingPage} />
      </Switch>
    </main>
  );
}
//Created my free logo at LogoMakr.com
//cursor: progress or wait for thinking
export default App;