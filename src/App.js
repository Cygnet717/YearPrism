import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from'./Components/Header/Header';
import LandingPage from './Components/LandingPage/LandingPage';
import LoginPage from './Components/LoginPage/LoginPage';
import RegisterPage from './Components/RegisterPage/RegisterPage';
import BuildAccount from './Components/RegisterPage/BuildAccount';
import Home from './Components/HomePage/HomePage';
import YearViewPage from './Components/YearViewPage/YearViewPage';

function App() {
  return (
    <main className='App'>
      <Header/>
      <Switch>
        <Route exact path={'/'} component={LandingPage} />
        <Route path={'/Login'} component={LoginPage}/>
        <Route path={'/Register'} component={RegisterPage}/>
        <Route path={'/AddEvent'} component={BuildAccount}/>
        <Route path={'/Home'} component={Home}/>
        <Route path={'/Year/:year'} component={YearViewPage}/>
      </Switch>
    </main>
  );
}
// <footer role="content-info">Created my free logo at LogoMakr.com</footer>
//cursor: progress or wait for thinking
export default App;