import React, { Component } from 'react';
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

    handleClick = (e) => {
        var dropdown = document.getElementById('suggestionsdropdown')
        if(e.target !== dropdown && e.target.parentNode !== dropdown){
            e.preventDefault()
            this.setState({
                suggestions: 'sugghidden'
            })
            return;
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick)
    }

    render(){
        let ListEvents = this.state.newEvents.map(i => {
                return <p key={i.eName}>{i.date}, {i.eName}, {i.category}, {i.notes}</p>
            })

        return(
            <>
            <button onClick={() => this.ShowHideSugg()}>Suggestions</button>
            <div id='suggestionsdropdown' className={this.state.suggestions}>
                <ul className='sugg-content'>
                    <li className='sugg'><u>Achievements</u>: ran a 5K, paied off debt, bought a house, 1 year sober, ect.</li>
                    <li className='sugg'><u>Body Modifications</u>: Laser eye surgery, tattoo, piercing, ect.</li>
                    <li className='sugg'><u>Family</u>: Birth, death, adoption, marrage, divorce, ect.</li>
                    <li className='sugg'><u>Home</u>: Moving, replaced furnace, build a deck, painted a room, ect.</li>
                    <li className='sugg'><u>Job</u>: Start a new job, promotion, new title, leave job, ect.</li>
                    <li className='sugg'><u>Medical</u>: Teeth cleaning, tetanus shot, surgery, ect.</li>
                    <li className='sugg'><u>Pets</u>: Adopted/bought new pet, medical procedures, death, ect.</li>
                    <li className='sugg'><u>Relationship</u>: Start a new relationship, wedding, major milestone, end relationship, ect.</li>
                    <li className='sugg'><u>School</u>: Start a new school, graduation, ect.</li>
                </ul>
            </div>
            <form className='builder'>
            <fieldset>
              <legend>Input New Event</legend>
                <Input />
                <button onClick={(event) =>this.AddEvent(event)}>Add Event</button>
            </fieldset>
            
            
          </form>
          {this.state.newEvents.length === 0 ? <></> : ListEvents}
          <button>Done</button>
          </>
        )
    }
}