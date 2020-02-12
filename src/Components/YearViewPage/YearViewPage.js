import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EventsService from '../../Services/events-service';
import editImg from '../../Images/edit.png';
import deleteImg from '../../Images/delete.png';
import {Image/*, Transformation, CloudinaryContext*/} from 'cloudinary-react';
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
            date: '',
            eventName: '',
            category: '',
            notes: '',
        }
    }

    showEditFeature(event){
        if(this.state.edit === 'hiddenEdit'){
            this.setState({
                edit: 'showEdit',
                date: event.eventdate,
                eventName: event.eventname,
                category: event.category,
                notes: event.notes,
            })
        } 
    }

    submitChangeEvent=()=>{
        console.log('submitted')
        this.setState({
           edit: 'hiddenEdit'
        })
    }

    deleteEventClick(event){
        console.log(event.eventid)
        if (window.confirm(`Are you sure you want to delete this event? ${event.eventname}`)){
            console.log('deleted')
            EventsService.deleteEvent(event.eventid)
            let lessEvents = this.state.yearEvents.filter(i => i.eventid !== event.eventid)
            this.setState({ yearEvents: lessEvents })
        } else {
            console.log('not deleted')
        }
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
        const categories = ['Achievements', 'Body Modification', 'Family', 'Home', 'Job', 'Medical', 'Pets', 'Relationship', 'School', 'Vacation', 'Other']
        return(
            <div>
                <h3 className='yearheader'>{this.props.match.params.year}</h3>
                <div  className={this.state.edit}>
                    <form id='editpopup' className='edit-content' onSubmit={this.submitChangeEvent}>
                        <label>Date</label>
                        <input type='date' id='date' defaultValue={this.state.eventdate}/>
                        <br/>
                        <label>Event name</label>
                        <input type='text' id='eName' defaultValue={this.state.eventname} size="28"/>
                        <br/>
                        <label>Category</label>
                        <select id='category' >
                            {categories.map(i => {
                                if(i === this.state.category){
                                    return <option selected id='category' key={i} name='category' value={i}>{i}</option>
                                }
                                return <option id='category' key={i} name='category' value={i}>{i}</option>
                            })}
                        </select>
                        <br/>
                        <label>Notes</label>
                        <input id='notes' type='textbox' size='44' defaultValue={this.state.notes}/>
                        <br/>
                        <input type='submit'/>
                    </form>
                </div> 
                {this.state.yearEvents.map(i => {
                    let date = new Date(i.eventdate)
                        return <div className='indivevent' id={i.eventid} key={i.eventid}>
                            <p className='eventInfo'>{date.toDateString()}<br/>{i.eventname}<br/> Notes: {i.notes}</p>
                            <div className='imagebox'>
                                <Image className='eventImage' cloudName="dingowidget" publicId={i.eventImage} width="100" crop="scale" />
                            </div>
                            <div className='eventbuttons'>
                                <img className='editIcon' src={editImg} alt='edit' onClick={() => this.showEditFeature(i)}/>
                                <img className='editIcon' src ={deleteImg} alt='delete' onClick={() => this.deleteEventClick(i)}/>
                            </div>
                        </div>
                })}
                <div className='linkDiv'>
                <Link to={'/AddEvent'} className='addeventlink'>AddEvent</Link>
                </div>
            </div>
        )
    }
}