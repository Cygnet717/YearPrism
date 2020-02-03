import React, { Component } from 'react';
import CreateAccount from './CreateAccount';
import BuildAccount from './BuildAccount';
import './RegisterPage.css';

export default class RegisterPage extends Component {
    constructor(props){
        super(props)
        this.state ={
            step: 1,
        }
    }
    StepTwo(){
        this.setState({
            step: 2,
        })
    }
    render() {
        return(
            <div>
                {this.state.step === 1 ? <CreateAccount complete={() => this.StepTwo()}/>: <BuildAccount/>}
               
            </div>
        )
    }
}