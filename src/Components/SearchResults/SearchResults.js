import React, {Component} from 'react';
import editImg from '../../Images/edit.png';
import deleteImg from '../../Images/delete.png';
import { Link } from 'react-router-dom';
import UserContext from '../../Context/user-context';
import EventsService from '../../Services/events-service';
import reverse from '../../Images/reverse.png';
import './SearchResults.css'

export default class SearchResults extends Component{
  static contextType = UserContext;
  static defaultProps ={
    match: { params: {}},
  };
  constructor(props){
    super(props)
    this.state ={
      categoryFilteredEvents: [],
      editSearched: 'hiddenEdit',
      order: 'OtoN',
			category: '',
      eventname: '',
      eventdate: '',
      eventid: '',
      notes: ''
    }
  }

  showEditFeature(event){
  let editDate = event.eventdate.slice(0, 10)
  if(this.state.editSearched === 'hiddenEdit'){
    this.setState({
      editSearched: 'showEdit',
      eventid: event.eventid,
      eventdate: editDate,
      eventname: event.eventname,
      category: event.category,
      notes: event.notes,
    })
  } 
  }
  
  reverseOrder() {
    if(this.state.order === 'OtoN'){
      this.setState({ order: 'NtoO' })
    } else {
      this.setState({ order: 'OtoN' })
    }
  }

  filterCategoryEvents() {
    let fEvents =[]
    this.context.events.map(i => {
      if(i.category === this.props.match.params.Category){
        fEvents = fEvents.concat(i)
      }
      return 'return'
    })
    let sorted = fEvents.sort((a, b) => new Date(a.eventdate) - new Date(b.eventdate))
    this.setState({
      categoryFilteredEvents: sorted
    })
  }

  submitChangeEvent=(e)=>{
    e.preventDefault()
    const data = new FormData(e.target)
    const DateFormated = new Date(data.get('eventdate'))
    let EditedEvent = {
      eventid: this.state.eventid,
      eventdate: DateFormated,
      eventname: data.get('eventname'),
      category: data.get('category'),
      notes: data.get('notes')
    }
    EventsService.EditEvent(EditedEvent)
    .then(res => {
      const changedIndex = this.state.categoryFilteredEvents.findIndex(i => i.eventid === res[0].eventid)
      let thing = this.state.categoryFilteredEvents
      thing[changedIndex] = res[0];
      thing = thing.sort((a, b) => new Date(a.eventdate) - new Date(b.eventdate))
      this.setState({
        categoryFilteredEvents: thing,
      })
    })
    this.cancelEdit()
  };

  checkDateValid(event){
    event.preventDefault()
    let date = this.state.eventdate;
    let name = this.state.eventname;
    let cat = this.state.category;
    if(date < this.context.birthyear || date.toString()> '2021-01-01'){
      alert('Event date must be between birth year and present')
    } else if(name === '') {
      alert('Event name must be given')
    } else if(cat === 'Select'){
      alert('Please select a category')
    } else{
      this.submitChangeEvent(event)
    }
  }

  changeState(e){
		let obj={};
		let key = e.target.name;
		let value = e.target.value;
		obj[key] = value;
		this.setState( obj )
	}

	cancelEdit(){
    this.setState({
      editSearched: 'hiddenEdit',
      category: '',
      eventname: '',
      eventdate: '',
      eventid: '',
      notes: ''
    })
  }

  deleteEventClick(event){
    if (window.confirm(`Are you sure you want to delete this event? ${event.eventname}`)){
      EventsService.deleteEvent(event.eventid)
      let lessEvents = this.state.categoryFilteredEvents.filter(i => i.eventid !== event.eventid)
      this.setState({ categoryFilteredEvents: lessEvents })
    } else {
    	console.log('not deleted')
    }
	}

  componentDidMount() {
    this.filterCategoryEvents()
  }
  render(){
    if(!sessionStorage.user_id){
      return (
        <div className='maindiv'>
          <h4>Oops you arn't logged in!</h4>
          <div className=' oopsbutton'>
            <Link 
                className='button'
                to='/'>
                Home Page
            </Link>
          </div>
        </div>
      )
    }
    const categName = this.props.match.params.Category
    const categories = ['Achievements', 'Body Modification', 'Family', 'Home', 'Job', 'Medical', 'Pets', 'Relationship', 'School', 'Vacation', 'Other']
    return(
      <div className='mainYearViewDiv'>
        <div className='home_sort'>
          <Link to={'/Home'} className='homenavlink'>Home</Link>
          <img className='reverseIcon' src={reverse} alt='reverse order' onClick={() =>this.reverseOrder()}/>
        </div>
          <h3 className='categheader'>{categName}</h3>
          <div  className={this.state.editSearched}>
          <form id='editpopup' className='edit-content' onSubmit={(e) => this.checkDateValid(e)}>
            <label>Date </label>
            <input type='date' name='eventdate' id='eventdate' value={this.state.eventdate} onChange={e => this.changeState(e)}/>
            <br/>
            <label>Event name</label>
						<br/>
            <input type='text' name='eventname' id='eventname' value={this.state.eventname} onChange={e => this.changeState(e)} size="28"/>
            <br/>
            <label>Category </label>
            <select id='category' name='category' value={categories.find(cat => cat === this.state.category)} onChange={e => this.changeState(e)}>
              {categories.map(cat => {
                return <option id='category' key={cat} name='category' value={cat}>{cat}</option>
              })}
            </select>
            <br/>
            <label>Notes</label>
						<br/>
            <textarea id='notes' name='notes' value={this.state.notes} onChange={e => this.changeState(e)} type='textbox' cols='40' rows='4'/>
            <br/>
            <input type='submit'/>
						<button type='button' onClick={() =>this.cancelEdit()}>Cancel</button>
          </form>
          </div> 
          <div className={this.state.order}>
          {this.state.categoryFilteredEvents.map(i => {
            let date = new Date(i.eventdate.replace(/-/g,'/').replace(/T.+/, ''))
            return (
              <div className='eventbox' id={i.eventid} key={i.eventid}>
                <div className='indivevent'>
                  <div className='eventInfo'>{date.toDateString()}</div>
                  <div className='eventdiv'><u>Event:</u> {i.eventname}</div>
                  <div className='eventdiv'><u>Category:</u> {i.category}</div>
                  <div className='eventdiv'><u>Notes:</u> {i.notes === ''? '---': i.notes}</div>
                </div>
                <div className='eventbuttons'>
                  <img className='editIcon' src={editImg} alt='edit' onClick={() => this.showEditFeature(i)}/>
                  <img className='editIcon' src ={deleteImg} alt='delete' onClick={() => this.deleteEventClick(i)}/>
                </div>
              </div>
            )
          })}
          </div>
          <div className='linkDiv'>
          <Link to={'/AddEvent'} className='addeventlink'>AddEvent</Link>
          </div>
        </div>
      )
  }
}