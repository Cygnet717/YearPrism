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
    super(props);
      this.state ={
        newEvents: [],
        suggestions: 'sugghidden',
        error: null,
        thinking: false,
        dateError: false,
        nameError: false,
        categoryError: false
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
    
	async AddEvent(event){
    event.preventDefault();
    let date = await this.checkDateValid(event);
    let name = await this.checkNameValid(event);
    let category = await this.checkCatValid(event);
    if(!date && !name && !category){
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
    }
  };

  checkDateValid(event){
    event.preventDefault();
    let eventdate = document.getElementById('eventdate').value;
    
    
    if(eventdate < this.context.birthyear || eventdate.toString()> '2021-01-01'){
      this.setState({ dateError: true })
      return true
    } else {
      this.setState({ dateError: false })
      return false
    }
  };

  checkNameValid(event){
    event.preventDefault();
    let name = document.getElementById('eventname').value;
    if(name === '') {
      this.setState({ nameError: true })
      return true
    } else {
      this.setState({ nameError: false })
      return false
    }
  };

  checkCatValid(event){
    event.preventDefault();
    let cat = document.getElementById('category').value;
    if(cat === 'Seletc' || cat === ''){
      this.setState({ categoryError: true })
      return true
    } else {
      this.setState({ categoryError: false })
      return false
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
          <h4>Oops you aren't logged in!</h4>
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
              <li className='sugg'><u>Achievements</u>: ran a 5K, paid off debt, bought a house, 1 year sober, etc.</li>
              <li className='sugg'><u>Body Modifications</u>: Laser eye surgery, tattoo, piercing, etc.</li>
              <li className='sugg'><u>Family</u>: Birth, death, adoption, marriage, divorce, etc.</li>
              <li className='sugg'><u>Home</u>: Moving, replaced furnace, built a deck, painted a room, etc.</li>
              <li className='sugg'><u>Job</u>: Start a new job, promotion, new title, leave job, etc.</li>
              <li className='sugg'><u>Medical</u>: Teeth cleaning, tetanus shot, surgery, etc.</li>
              <li className='sugg'><u>Pets</u>: Adopted/bought new pet, medical procedures, death, etc.</li>
              <li className='sugg'><u>Relationship</u>: Start a new relationship, wedding, major milestone, end relationship, etc.</li>
              <li className='sugglast'><u>School</u>: Start a new school, graduation, etc.</li>
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
              {this.state.dateError? <span className='red'>Event date must be between birth year and present</span>: <></>}
              <br/>
              <label>Event name </label>
              <br/>
              <input type='text' id='eventname' size="34"/>
              {this.state.nameError? <span className='red'>Event name must be given</span>: <></>}
              <br/>
              <label>Category </label>
              <button className='buildButton examplesbutton' onClick={(e) => this.ShowHideSugg(e)}>Examples</button>
              <br/>
              <seletc id='category'>
                <option hidden defaultValue>Seletc</option>
                {categories.map(i => {
                  return <option id='category' key={i} name='category' value={i}>{i}</option>
                })}
              </seletc>
              {this.state.categoryError? <span className='red'>Please seletc a category</span>: <></>}
              <br/>
              <label>Notes </label>
              <br/>
              <textarea id='notes' name='notes' type='textbox' cols='37' rows='4'/>
            </div>
              <button className='buildButton' onClick={(event) =>this.AddEvent(event)}>Add Event</button>
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