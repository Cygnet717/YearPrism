import React, { Component } from 'react';
import AddMoreButton from './AddMoreButton';
import './RegisterPage.css';
import Input from './Input';


export default class BuildAccount extends Component {
    constructor(props){
        super(props)
        
        this.state ={
            newEvents: [],
            suggestions: 'sugghidden',
        }
    }

    ShowHideSugg() {
        if(this.state.suggestions === 'sugghidden'){
            this.setState({
                suggestions: 'suggshow'
            })
        } else {
            this.setState({
                suggestions: 'sugghidden'
            })
        }
    }
    
    AddEvent(event){
        event.preventDefault()
        this.setState({
            newEvents: this.state.newEvents.concat({
                date: document.getElementById('date').value,
                eName: document.getElementById('eName').value,
                category: document.getElementById('category').value,
                notes: document.getElementById('notes').value
            })
        })
        document.getElementById('date').value ='';
        document.getElementById('eName').value ='';
        document.getElementById('notes').value ='';
        document.getElementById('category').value ='default'
    }

    render(){
        let ListEvents = this.state.newEvents.map(i => {
                return <p key={i.eName}>{i.date}, {i.eName}, {i.category}, {i.notes}</p>
            })

        return(
            <>
            <button onClick={() => this.ShowHideSugg()}>Suggestions</button>
            <div className={this.state.suggestions}>
                <ul>
                    <li>School: Start a new school, graduation, ect.</li>
                    <li>Relationship: Start a new relationship, wedding, major milestone, end relationship, ect.</li>
                    <li>Job: Start a new job, promotion, new title, leave job, ect.</li>
                    <li>Achievements: ran a 5K, paied off debt, bought a house, 1 year sober, ect.</li>
                    <li>Body Modifications: Laser eye surgery, tattoo, piercing, ect.</li>
                    <li>Family: Birth, death, adoption, marrage, divorce, ect.</li>
                    <li>Pets: Adopted/bought new pet, medical procedures, death, ect.</li>
                    <li>Medical: Teeth cleaning, tetanus shot, surgery, ect.</li>
                </ul>
            </div>
            <form>
            <fieldset>
              <legend>Input New Event</legend>
                <Input />
                <button onClick={(event) =>this.AddEvent(event)}>Add Event</button>
            </fieldset>
            
            <input type='submit' value='Done'/>
          </form>
          {this.state.newEvents.length === 0 ? <></> : ListEvents}
          </>
        )
    }
}