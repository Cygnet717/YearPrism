import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import hamburger from '../../Images/hamburger.png';
import UserContext from '../../Context/user-context';
import TokenService from '../../Services/token-service';
import logoYP from '../../Images/LogoYP.png';
import './Header.css';

export default class Header extends Component {
  static contextType = UserContext;
  constructor(props){
    super(props);
    this.state = {
      burger: 'burgerhidden',
    }
  };

  renderLogInLink(){
    return (
      <div className='regLoginButtons'>
        <Link to='/Login' className='button headerbutton'>Login</Link>
        <Link to='/Register' className='button headerbutton'>Register</Link>
      </div>
    )
  };

  renderHamburger(){
    return(
      <div className='headerright'>
        <h4 className='salutation'>Hi, {this.context.username}</h4>
        <img className='hamburger' 
          src={hamburger} alt='Hamburger Menu' 
          onClick={()=>{this.RenderBurgerMenu()}}>
        </img>  
        <div className={`falseburger ${this.state.burger}`} onClick={()=>this.RenderBurgerMenu()}>
          <nav id='burgerdropdown' className={`realburger ${this.state.burger}`}> 
            <Link to='/Home' onClick={()=>{this.RenderBurgerMenu()}}>Home</Link>
            <Link to='/AddEvent' onClick={()=>{this.RenderBurgerMenu()}}>Add Event</Link>
            <Link to='/' onClick={() => {this.logoutClick()}}>Log Out</Link>
            <Link to='/DeleteAccount' onClick={()=>{this.RenderBurgerMenu()}}>Delete Account</Link>
          </nav>
        </div>
      </div>
    )
  };

  logoutClick(){
    TokenService.clearAuthToken()
    this.context.clearUserInfo()
  };

  RenderBurgerMenu(){
    if(this.state.burger === 'burgerhidden'){
      this.setState({
        burger: 'burgermenu'
      })
    } else {
      this.setState({
        burger:'burgerhidden'
      })
    }   
  };
    
  render(){
    return (
      <nav className='mainNav'>
        <Link className='headerLink' to='/'>
          <img src={logoYP} alt='logo and home button' className='logoimage'/>
        </Link>
        {this.context.user_id? this.renderHamburger() : this.renderLogInLink() }    
      </nav>
    )
  }
};