import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import hamburger from '../../Images/hamburger.png';
import './Header.css'

export default class Header extends Component {
    
    renderLogInLink(){
        return (
            <>
            <button className='button header'>LogIn</button>
            <button className='button header'>Register</button>
            </>
        )
    }
    RenderBurgerMenu(){
        console.log('click')
    }
    render(){
        return (
            <nav>
                <Link className='headerLink' to='/'>
                    <h1>YearPrism</h1>
                </Link>
                {true ? this.renderLogInLink() : <></>}
                <img className='hamburger' src={hamburger} alt='Hamburger Menu' onClick={this.RenderBurgerMenu()}></img>
                <div className='burgermenu'>
                    <p>Add Event</p>
                    <p>Color Option</p>
                    <p>View Option</p>
                    <p>Delete Account</p>
                </div>
            </nav>
        )
    }
};