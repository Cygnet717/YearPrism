import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import './LandingPage.css';

export default class LandingPage extends Component{
    render(){
        return(
            <div className='intro'>
               
                <p>When exactlly did I get this tattoo?</p>
                <p>What month did I start that job 5 years ago?</p>
                <p>How long has it been since my last tetanus shot?</p>
                <p>How long ago did we go on that vacation?</p>
                <p>When did we adoopt our cat Fluffy?</p>
                <p>Easily find the answers to all these questions and more 
                when you store all your life events and milestones in YearPrism!
                </p>
                
                <p>Try it out with this Demo User Account:<br/>
                    UserName: DemoUser<br/>
                    Password: DemoUser!1
                </p>
                <Footer />
            </div>
        )
    }
};