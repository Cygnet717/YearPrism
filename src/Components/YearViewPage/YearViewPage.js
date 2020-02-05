import React, { Component } from 'react';
import Store from '../dummy-store';
import './YearViewPage.css';
import editImg from '../../Images/edit.png';

export default class YearView extends Component{
    static defaultProps ={
        match: { params: {}},
    };

    constructor(props){
        super(props)
        this.state ={
            yearEvents : null,
            edit: 'hiddenEdit',
            date: '',
            eventName: '',
            category: '',
            notes: '',
        }
    }

    showEditFeature(event){
        let month = (new Date(Date.parse(event.eventMonth + "1, 2020")).getMonth()+1)
        if(month <10){
            month = '0' + month
        }
        let formatedDate = event.eventYear + '-' + month;
        if(this.state.edit === 'hiddenEdit'){
            this.setState({
                edit: 'showEdit',
                date: formatedDate,
                eventName: event.eventName,
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

    handleClick = (e) => {
        var dropdown = document.getElementById('editpopup')
        console.log(dropdown)
        
        if(e.target !== dropdown && e.target.parentNode !== dropdown){
            console.log(e.target.parentNode)
            this.setState({
                edit: 'hiddenEdit'
            })
            return;
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick)
    }

    //componentDidMount(){
        //const { year }= this.props.match.params.year

        //fetch(what happened this year)
        //.then((yearEvents) => {
        //    this.setState(() => ({ yearEvents }))
        //})  
    //}

    render(){
        const categories = ['Achievements', 'Body Modification', 'Family', 'Home', 'Job', 'Medical', 'Pets', 'Relationship', 'School', 'Vacation', 'Other']
        return(
            <div>
                <h3 className='yearheader'>{this.props.match.params.year}</h3>
                <div  className={this.state.edit}>
                    <form id='editpopup' className='edit-content' onSubmit={this.submitChangeEvent}>
                        <label>Date</label>
                        <input type='month' id='date' defaultValue={this.state.date}/>
                        <br/>
                        <label>Event name</label>
                        <input type='text' id='eName' defaultValue={this.state.eventName} size="28"/>
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
                {Store.eventsFiltered.map(i => {
                    return <div className='indivevent' id={i.eventId} key={i.eventId}>{i.eventMonth}&emsp;{i.eventName}<br/> Notes: {i.notes}
                    <img className='editIcon' src={editImg} alt='edit' onClick={() => this.showEditFeature(i)}/>
            </div>
                })}
            </div>
        )
    }
}