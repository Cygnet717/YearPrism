import React, { Component } from 'react';
import EventsService from '../../Services/events-service';
import UserContext from '../../Context/user-context';
import { Link } from 'react-router-dom';
import thinking from '../../Images/spinner.gif';
import remove from '../../Images/remove.png';
import './RegisterPage.css';

export default class BuildAccount extends Component {
  static contextType = UserContext;
  constructor(props){
    super(props)
      this.state ={
        newEvents: [],
        suggestions: 'sugghidden',
        error: null,
        thinking: false,
      }
  };

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  ShowHideSugg(e){
    e.preventDefault();
    if(this.state.suggestions === 'sugghidden'){
      this.setState({
        suggestions: 'suggshow'
      })
    } else {
      this.setState({
      	suggestions: 'sugghidden'
      })
    }
  };
    
	AddEvent(event){
    event.preventDefault();
    this.setState({
      newEvents: this.state.newEvents.concat({
        eventdate: document.getElementById('eventdate').value,
        eventname: document.getElementById('eventname').value,
        category: document.getElementById('category').value,
        notes: document.getElementById('notes').value
      })
    });
    document.getElementById('eventdate').value ='';
    document.getElementById('eventname').value ='';
    document.getElementById('notes').value ='';
    document.getElementById('category').value ='default';
  };

  checkDateValid(event){
    event.preventDefault();
    let eventdate = document.getElementById('eventdate').value;
    let name = document.getElementById('eventname').value;
    let cat = document.getElementById('category').value;
    if(eventdate < this.context.birthyear || eventdate.toString()> '2021-01-01'){
      alert('Event date must be between birth year and present')
    } else if(name === '') {
      alert('Event name must be given')
    } else if(cat === 'Select' || cat === ''){
      alert('Please select a category')
    } else{
      this.AddEvent(event)
    }
  };

  submitNewEvents() {
		this.setState({
			thinking: true,
		});
    this.state.newEvents.map(i => {
      EventsService.postNewEvent(this.context.user_id, i)
      	.catch(res => this.setState({ 
					error: res.error,
					thinking: false
				}))
          return 'return'
  	})
    if(this.state.error === null){ this.movePage() }
    return 'return'
  };

  movePage = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/Home'
    history.push(destination)
  };

  renderThinking() {
    return (
      <div className='thinkingbox'>
        <img id='thinking' src={thinking} alt='loading...'/>
      </div>
    )
  };

  removeQueuedEvent(unwanted){
    let arrOneLess = this.state.newEvents.filter(inv => inv !== unwanted) 
    this.setState({ newEvents: arrOneLess})
  };

  render(){
    const categories = ['Achievements', 'Body Modification', 'Family', 'Home', 'Job', 'Medical', 'Pets', 'Relationship', 'School', 'Vacation', 'Other'];
    if(!sessionStorage.user_id){
      return (
        <div className='maindiv'>
          <h4>Oops you arn't logged in!</h4>
          <div className=' oopsbutton'>
            <Link className='button'to='/'>
              Home Page
            </Link>
          </div>
        </div>
      )
    };
    let ListEvents = this.state.newEvents.map(i => {
      let unique = Math.floor(Math.random() * 1000);
      return (
        <div className='eventQueue' key={unique}>
          <p>{i.eventdate}, Name: {i.eventname}, {i.category}, Notes: {i.notes}</p>
          <div className='deleteimage'>
            <img src={remove} alt='delete event' onClick={() =>this.removeQueuedEvent(i)}/>
          </div>
        </div>
      )
    });

    return(
      <div className='mainBuildDiv'>
        <div className={`falsesugg ${this.state.suggestions}`} onClick={(e) => this.ShowHideSugg(e)}>
          <div id='suggestionsdropdown' className={`truesugg`}>
            <ul className='sugg-content'>
              <li className='sugg'><u>Achievements</u>: ran a 5K, paied off debt, bought a house, 1 year sober, ect.</li>
              <li className='sugg'><u>Body Modifications</u>: Laser eye surgery, tattoo, piercing, ect.</li>
              <li className='sugg'><u>Family</u>: Birth, death, adoption, marrage, divorce, ect.</li>
              <li className='sugg'><u>Home</u>: Moving, replaced furnace, build a deck, painted a room, ect.</li>
              <li className='sugg'><u>Job</u>: Start a new job, promotion, new title, leave job, ect.</li>
              <li className='sugg'><u>Medical</u>: Teeth cleaning, tetanus shot, surgery, ect.</li>
              <li className='sugg'><u>Pets</u>: Adopted/bought new pet, medical procedures, death, ect.</li>
              <li className='sugg'><u>Relationship</u>: Start a new relationship, wedding, major milestone, end relationship, ect.</li>
              <li className='sugglast'><u>School</u>: Start a new school, graduation, ect.</li>
            </ul>
          </div>
        </div>
        <form className='builder' id='form'>
          <fieldset>
            <legend>Add a New Event</legend>
            <div>
              <label>Date </label>
              <br/>
              <input type='date' id='eventdate'/>
              <br/>
              <label>Event name </label>
              <br/>
              <input type='text' id='eventname' size="34"/>
              <br/>
              <label>Category </label>
              <button className='buildButton examplesbutton' onClick={(e) => this.ShowHideSugg(e)}>Examples</button>
              <br/>
              <select id='category'>
                <option hidden defaultValue>Select</option>
                {categories.map(i => {
                  return <option id='category' key={i} name='category' value={i}>{i}</option>
                })}
              </select>
              <br/>
              <label>Notes </label>
              <br/>
              <textarea id='notes' name='notes' type='textbox' cols='37' rows='4'/>
            </div>
              <button className='buildButton' onClick={(event) =>this.checkDateValid(event)}>Add Event</button>
          </fieldset>
        </form>
        <div role='alert'>
          {this.state.error && <p className='red'>{this.state.error}</p>}
        </div>
        {this.state.thinking? this.renderThinking(): <span></span>}
        {this.state.newEvents.length === 0 ? <></> : ListEvents}
        {this.state.newEvents.length === 0 
          ? <div className='fakeGoButton'>Submit</div>
          : <Link className='buildButton link' to={'/Home'} onClick={() => this.submitNewEvents()}>Submit</Link>
        } 
      </div>
    )
  }
};