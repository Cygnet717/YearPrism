import React, {Component} from 'react';
import editImg from '../../Images/edit.png';
import { Link } from 'react-router-dom';
import UserContext from '../../Context/user-context';
import {Image/*, Transformation, CloudinaryContext*/} from 'cloudinary-react';

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
            date: '',
            eventName: '',
            category: '',
            notes: '',
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

    componentDidMount() {
        this.filterCategoryEvents()
    }
    render(){
        const categName = this.props.match.params.Category
        const categories = ['Achievements', 'Body Modification', 'Family', 'Home', 'Job', 'Medical', 'Pets', 'Relationship', 'School', 'Vacation', 'Other']
        return(
            <div>
                <h3 className='yearheader'>{categName}</h3>
                <div  className={this.state.editSearched}>
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
                {this.state.categoryFilteredEvents.map(i => {
                    let date = new Date(i.eventdate)
                        return <div className='indivevent' id={i.eventid} key={i.eventid}>
                            <p className='eventInfo'>{date.toDateString()}<br/>{i.eventname}<br/> Notes: {i.notes}</p>
                            <div className='imagebox'>
                                <Image className='eventImage' cloudName="dingowidget" publicId={i.eventImage} width="100" crop="scale" />
                            </div>
                            <img className='editIcon' src={editImg} alt='edit' onClick={() => this.showEditFeature(i)}/>
                        </div>
                })}
                <div className='linkDiv'>
                <Link to={'/AddEvent'} className='addeventlink'>AddEvent</Link>
                </div>
            </div>
        )
    }
}