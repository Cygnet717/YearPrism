import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EventsService from '../../Services/events-service';
import editImg from '../../Images/edit.png';
import deleteImg from '../../Images/delete.png';
import nextImg from '../../Images/next.png';
import backImg from '../../Images/back.png';
import './YearViewPage.css';

export default class YearView extends Component{
    static defaultProps ={
        match: { params: {}},
    };

    constructor(props){
        super(props)
        this.state ={
            yearEvents : [],
            edit: 'hiddenEdit',
            eventid: '',
            date: '',
            eventname: '',
            category: '',
            notes: '',
        }
    }

    showEditFeature(event){
        let editDate = event.eventdate.slice(0, 10)
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
    }

    cancelEdit(){
        this.setState({
            edit: 'hiddenEdit',
           category: '',
           eventname: '',
           eventdate: '',
           eventid: '',
           notes: ''
        })
    }

    submitChangeEvent=(e)=>{
        e.preventDefault()
        const data = new FormData(e.target)
        const DateFormated = new Date(data.get('date'))
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
    }

    deleteEventClick(event){
        if (window.confirm(`Are you sure you want to delete this event? ${event.eventname}`)){
            console.log('deleted')
            EventsService.deleteEvent(event.eventid)
            let lessEvents = this.state.yearEvents.filter(i => i.eventid !== event.eventid)
            this.setState({ yearEvents: lessEvents })
        } else {
            console.log('not deleted')
        }
    }

    updatePage(year){
        EventsService.getYearEvents(year)
        .then(filteredYearEvents => {
            let sorted = filteredYearEvents.rows.sort((a, b) => new Date(a.eventdate) - new Date(b.eventdate))
            this.setState({
                yearEvents: sorted
            })
        })  
    }

    componentDidMount(){
        const year = this.props.match.params.year
        EventsService.getYearEvents(year)
        .then(filteredYearEvents => {
            let sorted = filteredYearEvents.rows.sort((a, b) => new Date(a.eventdate) - new Date(b.eventdate))
            this.setState({
                yearEvents: sorted
            })
        })  
    }

    render(){
        const currYear = this.props.match.params.year
        let plusOne = parseInt(currYear)+1
        let minusOne = parseInt(currYear)-1
        const categories = ['Achievements', 'Body Modification', 'Family', 'Home', 'Job', 'Medical', 'Pets', 'Relationship', 'School', 'Vacation', 'Other']
        return(
            <div className='mainYearViewDiv'>
                <Link to={'/Home'} className='homenavlink'>Home</Link>
                <div className='yearnav'>
                    <Link to={`/Year/${minusOne}`} key={minusOne} onClick={() => {this.updatePage(minusOne)}} className='yearnavlink' >
                        <img src={backImg} alt='back'/>{minusOne}
                        </Link>
                    <h3 className='yearheader'>{this.props.match.params.year}</h3>
                    <Link to={`/Year/${plusOne}`} key={plusOne} onClick={() => {this.updatePage(plusOne)}} className='yearnavlink' >
                        {plusOne}<img src={nextImg} alt='next'/>
                        </Link>
                </div>
                
                <div  className={this.state.edit}>
                    <form id='editpopup' className='edit-content' onSubmit={(e) => this.submitChangeEvent(e)}>
                        <label>Date</label>
                        <input type='date' name='date' id='date' defaultValue={this.state.eventdate}/>
                        <br/>
                        <label>Event name</label>
                        <input type='text' name='eventname' id='eventname' defaultValue={this.state.eventname} size="28"/>
                        <br/>
                        <label>Category</label>
                        <select id='category' name='category'>
                            {categories.map(i => {
                                if(i === this.state.category){
                                    return <option selected id='category' key={i} name='category' value={i}>{i}</option>
                                }
                                return <option id='category' key={i} name='category' value={i}>{i}</option>
                            })}
                        </select>
                        <br/>
                        <label>Notes</label>
                        <input id='notes' name='notes' type='textbox' size='44' defaultValue={this.state.notes}/>
                        <br/>
                        <input type='submit'/><button type='button' onClick={() =>this.cancelEdit()}>Cancel</button>
                    </form>
                </div> 
                {this.state.yearEvents.map(i => {
                    let date = new Date(i.eventdate)
                        return (
                        <div className='indivevent' id={i.eventid} key={i.eventid}>
                            <p className='eventInfo'>{date.toDateString()}<br/>{i.eventname}<br/> Notes: {i.notes}</p>
                            <div className='eventbuttons'>
                                <img className='editIcon' src={editImg} alt='edit' onClick={() => this.showEditFeature(i)}/>
                                <img className='editIcon' src ={deleteImg} alt='delete' onClick={() => this.deleteEventClick(i)}/>
                            </div>
                        </div>
                        )
                })}
                <div className='linkDiv'>
                <Link to={'/AddEvent'} className='addeventlink'>AddEvent</Link>
                </div>
            </div>
        )
    }
}