import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import hamburger from '../../Images/hamburger.png';
import './Header.css';

export default class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            burger: 'burgerhidden',
        }
    }

    renderLogInLink(){
        return (
            <div className='regLoginButtons'>
            <Link to='/Login' className='button headerbutton'>LogIn</Link>
            <Link to='/Register' className='button headerbutton'>Register</Link>
            </div>
        )
    }

    renderHamburger(){
        return(
            <div>
                <img className='hamburger' 
                    src={hamburger} alt='Hamburger Menu' 
                    onClick={()=>{this.RenderBurgerMenu()}}>
                </img>  
                <nav className={this.state.burger}> 
                    <Link to='/Home' onClick={()=>{this.RenderBurgerMenu()}}>Home</Link>
                    <Link to='/AddEvent' onClick={()=>{this.RenderBurgerMenu()}}>Add Event</Link>
                    <Link to=''>Color Option</Link>
                    <Link to='/DeleteAccount' onClick={()=>{this.RenderBurgerMenu()}}>Delete Account</Link>
                </nav>
            </div>
        )
    }

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
        
    }
    render(){
        return (
            <nav className='mainNav'>
                <Link className='headerLink' to='/'>
                    <h1>YearPrism</h1>
                </Link>
                {false ? this.renderLogInLink() : this.renderHamburger()}
                
            </nav>
        )
    }
};