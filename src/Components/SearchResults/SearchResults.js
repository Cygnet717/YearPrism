import React, {Component} from 'react';
import editImg from '../../Images/edit.png';
import deleteImg from '../../Images/delete.png';
import { Link } from 'react-router-dom';
import UserContext from '../../Context/user-context';
import EventsService from '../../Services/events-service';
import {Image/*, Transformation, CloudinaryContext*/} from 'cloudinary-react';
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

    filterCategoryEvents() {
        let fEvents =[]
        this.context.events.map(i => {
            if(i.category === this.props.match.params.Category){
                fEvents = fEvents.concat(i)
            }
        })
        let sorted = fEvents.sort((a, b) => new Date(a.eventdate) - new Date(b.eventdate))
        this.setState({
            categoryFilteredEvents: sorted
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
            const changedIndex = this.state.categoryFilteredEvents.findIndex(i => i.eventid === res[0].eventid)
            let thing = this.state.categoryFilteredEvents
            thing[changedIndex] = res[0];
            thing = thing.sort((a, b) => new Date(a.eventdate) - new Date(b.eventdate))
            this.setState({
                categoryFilteredEvents: thing,
            })
    })
        this.cancelEdit()
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
        console.log(event.eventid)
        if (window.confirm(`Are you sure you want to delete this event? ${event.eventname}`)){
            console.log('deleted')
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
        const categName = this.props.match.params.Category
        const categories = ['Achievements', 'Body Modification', 'Family', 'Home', 'Job', 'Medical', 'Pets', 'Relationship', 'School', 'Vacation', 'Other']
        return(
            <div>
                <Link to={'/Home'} className='homenavlink'>Home</Link>
                <h3 className='categheader'>{categName}</h3>
                <div  className={this.state.editSearched}>
                    <form id='editpopup' className='edit-content' onSubmit={(e) => this.submitChangeEvent(e)}>
                        <label>Date</label>
                        <input type='date' id='date' name='date' defaultValue={this.state.eventdate}/>
                        <br/>
                        <label>Event name</label>
                        <input type='text' id='eventname' name='eventname' defaultValue={this.state.eventname} size="28"/>
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
                {this.state.categoryFilteredEvents.map(i => {
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