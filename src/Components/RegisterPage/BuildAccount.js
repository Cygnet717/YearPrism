import React, { Component } from 'react';
import EventsService from '../../Services/events-service';
import UserContext from '../../Context/user-context';
import { Link } from 'react-router-dom';
import './RegisterPage.css';
import Input from './Input';


export default class BuildAccount extends Component {
    static contextType = UserContext;
    constructor(props){
        super(props)
        
        this.state ={
            newEvents: [],
            suggestions: 'sugghidden',
            error: null,
        }
    }

    static defaultProps = {
        location: {},
        history: {
          push: () => {},
        },
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
                eventdate: document.getElementById('date').value,
                eventname: document.getElementById('eName').value,
                category: document.getElementById('category').value,
                notes: document.getElementById('notes').value
            })
        })
        document.getElementById('date').value ='';
        document.getElementById('eName').value ='';
        document.getElementById('notes').value ='';
        document.getElementById('category').value ='default'
    }

    submitNewEvents() {
        
        this.state.newEvents.map(i => {
            EventsService.postNewEvent(this.context.user_id, i)
            .catch(res => this.setState({ error: res.error }))
            return 'return'
        })
        if(this.state.error === null){ this.movePage() }
        return 'return'
    }

    movePage = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/Home'
        history.push(destination)
      };

    render(){
        let ListEvents = this.state.newEvents.map(i => {
                return <p key={i.eventname}>{i.eventdate}, {i.eventname}, {i.category}, {i.notes}</p>
            })

        return(
            <>
            <button onClick={() => this.ShowHideSugg()}>Suggestions</button>
            <div className={`falsesugg ${this.state.suggestions}`} onClick={() => this.ShowHideSugg()}>
                <div id='suggestionsdropdown' className={`truesugg ${this.state.suggestions}`}>
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
            </div>
            <form className='builder'>
            <fieldset>
              <legend>Input New Event</legend>
                <Input />
                <button onClick={(event) =>this.AddEvent(event)}>Add Event</button>
            </fieldset>
          </form>
          {this.state.newEvents.length === 0 ? <></> : ListEvents}
          <Link to={'/Home'} onClick={() => this.submitNewEvents()}>Done</Link>
          
          <div role='alert'>
                    {this.state.error && <p className='red'>{this.state.error}</p>}
                </div>
          </>
        )
    }
}