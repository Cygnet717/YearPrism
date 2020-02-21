import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EventsService from '../../Services/events-service';
import UserContext from '../../Context/user-context';
import editImg from '../../Images/edit.png';
import deleteImg from '../../Images/delete.png';
import nextImg from '../../Images/next.png';
import backImg from '../../Images/back.png';
import reverse from '../../Images/reverse.png';
import './YearViewPage.css';

export default class YearView extends Component{
  static contextType = UserContext;
  static defaultProps ={
  	match: { params: {}},
  };

  constructor(props){
  	super(props)
    this.state ={
    	yearEvents : [],
      edit: 'hiddenEdit',
      eventid: '',
      eventdate: '',
      eventname: '',
      category: '',
			notes: '',
    }
  };

  showEditFeature(event){
    let editDate = event.eventdate.slice(0, 10);
    if(this.state.edit === 'hiddenEdit'){
  	  this.setState({
				edit: 'showEdit',
		    eventid: event.eventid,
        eventdate: editDate,
        eventname: event.eventname,
        category: event.category,
        notes: event.notes,
      })
    } 
  };
	
	changeState(e){
		let obj={};
		let key = e.target.name;
		let value = e.target.value;
		obj[key] = value;
		this.setState( obj )
	};

  cancelEdit(){
    this.setState({
      edit: 'hiddenEdit',
		  category: '',
      eventname: '',
      eventdate: '',
      eventid: '',
      notes: ''
    })
  };

  submitChangeEvent=(e)=>{
	  e.preventDefault();
    const data = new FormData(e.target);
    const DateFormated = new Date(data.get('eventdate'));
    let EditedEvent = {
      eventid: this.state.eventid,
      eventdate: DateFormated,
      eventname: data.get('eventname'),
      category: data.get('category'),
      notes: data.get('notes')
    }
    EventsService.EditEvent(EditedEvent)
    .then(res => {
      const changedIndex = this.state.yearEvents.findIndex(i => i.eventid === res[0].eventid)
      let thing = this.state.yearEvents
      thing[changedIndex] = res[0];
      thing = thing.sort((a, b) => new Date(a.eventdate) - new Date(b.eventdate))
      this.setState({
        yearEvents: thing,
      })
    })
    this.cancelEdit()
  };

  checkDateValid(event){
    event.preventDefault();
    let date = this.state.eventdate;
    let name = this.state.eventname;
    let cat = this.state.category;
    if(date < this.context.birthyear || date.toString()> '2021-01-01'){
      alert('Event date must be between birth year and present')
    } else if(name === '') {
      alert('Event name must be given')
    } else if(cat === 'Select' || cat === ''){
      alert('Please select a category')
    } else{
      this.submitChangeEvent(event)
    }
  };

  deleteEventClick(event){
  	if (window.confirm(`Are you sure you want to delete this event? ${event.eventname}`)){
      EventsService.deleteEvent(event.eventid)
      let lessEvents = this.state.yearEvents.filter(i => i.eventid !== event.eventid)
      this.setState({ yearEvents: lessEvents })
      } else {
        console.log('not deleted')
      }
  };

	updatePage(year){
    EventsService.getYearEvents(year)
    .then(filteredYearEvents => {
      let sorted = filteredYearEvents.rows.sort((a, b) => new Date(a.eventdate) - new Date(b.eventdate))
      this.setState({
        yearEvents: sorted
      })
    })  
  };

  componentDidMount(){
    const year = this.props.match.params.year;
    EventsService.getYearEvents(year)
    .then(filteredYearEvents => {
      let sorted = filteredYearEvents.rows.sort((a, b) => new Date(a.eventdate) - new Date(b.eventdate))
      this.setState({
	      yearEvents: sorted
      })
    })  
  };

  render(){
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
    const currYear = this.props.match.params.year;
    let plusOne = parseInt(currYear)+1;
    let minusOne = parseInt(currYear)-1;
    const categories = ['Achievements', 'Body Modification', 'Family', 'Home', 'Job', 'Medical', 'Pets', 'Relationship', 'School', 'Vacation', 'Other'];
    return(
	    <div className='mainYearViewDiv'>
        <div className='home_sort'>
          <Link to={'/Home'} className='homenavlink'>Home</Link>
          <img className='reverseIcon' src={reverse} alt='reverse order' onClick={() =>this.context.updateOrder()}/>
        </div>
        <div className='yearnav'>
          <Link to={`/Year/${minusOne}`} key={minusOne} onClick={() => {this.updatePage(minusOne)}} className='yearnavlink' >
            <img src={backImg} alt='back'/>{minusOne}
          </Link>
          <h3 className='yearheader'>{this.props.match.params.year}</h3>
          <Link to={`/Year/${plusOne}`} key={plusOne} onClick={() => {this.updatePage(plusOne)}} className='yearnavlink' >
            {plusOne}<img src={nextImg} alt='next'/>
          </Link>
        </div>
        <div className={this.state.edit} onClick={() => this.cancelEdit()}>
          <div  className='realform'>
            <form id='editpopup' className='edit-content' onSubmit={(e) => this.checkDateValid(e)}>
              <label>Date </label>
              <input type='date' name='eventdate' id='eventdate' value={this.state.eventdate} onChange={e => this.changeState(e)}/>
              <br/>
              <label>Event name</label>
              <br/>
              <input type='text' name='eventname' id='eventname' value={this.state.eventname} onChange={e => this.changeState(e)} size="34"/>
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
              <textarea id='notes' name='notes' value={this.state.notes} onChange={e => this.changeState(e)} type='textbox' cols='36' rows='4'/>
              <br/>
              <div className='buttonholder'>
                <input type='submit'/>
                <input type='button' onClick={() =>this.cancelEdit()} value='Cancel'/>
              </div>
            </form>
          </div> 
        </div>
        <div className={this.context.order}>
        {this.state.yearEvents.map(i => {
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
};