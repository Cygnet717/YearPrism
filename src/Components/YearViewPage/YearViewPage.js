import React, { Component } from 'react';
import Store from '../dummy-store';
import './YearViewPage.css';
import editImg from '../../Images/edit.png';

//<div>Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a></div>

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

    submitChangeEvent(){
        console.log('submitted')
        this.setState({
            edit: 'hiddenEvent'
        })
    }

    componentDidMount(){
        //const { year }= this.props.match.params.year

        //fetch(what happened this year)
        //.then((yearEvents) => {
        //    this.setState(() => ({ yearEvents }))
        //})  
    }

    render(){
        const categories = ['School', 'Relationship', 'Job', 'Achievement', 'Body Modification', 'Vacation', 'Family', 'Pets', 'Medical', 'Other']
        return(
            <div>
                <h3 className='yearheader'>{this.props.match.params.year}</h3>
                <div className={this.state.edit}>
                    <form className='edit-content' onSubmit={this.submitChangeEvent}>
                        <span className="input">
                            <label>Date</label>
                            <input type='month' id='date' defaultValue={this.state.date}/>
                        </span>
                        <br/>
                        <span className="input">
                            <label>Event name</label>
                            <input type='text' id='eName' placeholder={this.state.eventName} size="28"/>
                        </span>
                        <br/>
                        <span>
                            <label>Category</label>
                            <select id='category' value={this.state.category}>
                                <option  disabled hidden >{this.state.category}</option>
                                {categories.map(i => {
                                    return <option id='category' key={i} name='category' value={i}>{i}</option>
                                })}
                            </select>
                        </span>
                        <br/>
                        <label>Notes</label>
                        <input id='notes' type='textbox' size='44' placeholder={this.state.notes}/>
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