import React, { Component } from 'react';
import Store from '../dummy-store';
import { Link } from 'react-router-dom';
import rightArrow from '../../Images/rightArrow.png';
import './HomePage.css';
import achievImg from '../../Images/002-award.png';
import modImg from '../../Images/005-mom.png';
import jobImg from '../../Images/001-job.png';
import relationImg from '../../Images/003-relationship.png';
import schoolImg from '../../Images/004-school.png';
import vacaImg from '../../Images/006-vacation.png';
import familyImg from '../../Images/007-family.png';
import petsImg from '../../Images/008-pets.png';
import medImg from '../../Images/009-medical.png';
import otherImg from '../../Images/010-other.png';

//<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a></div>

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state ={
            key: 'hidden',
        }
    }
    
    listYearsOfLife(year, events){
        let yearlist = []
        
        for(let i = 2020; i> parseInt(year); i--){
            yearlist.push({year: i, School: 0, Relationship: 0, Job: 0, Achievement: 0, BodyModification: 0, Vacation: 0, Family: 0, Pets: 0, Medical: 0, Other: 0})
        }
        events.map(i =>{
            let cat = i.category;
            const found = yearlist.findIndex(j => j.year === parseInt(i.eventYear))
            for (let [key, value] of Object.entries(yearlist[found])){
             
                if(key === cat.replace(/\s/g, '')){
                    yearlist[found][key] = value+1
                }
            }
            return 'return'
        })
        return yearlist
    } 

    showImgKey(){
        if(this.state.key === 'hidden'){
            this.setState({
                key: 'show'
            })
        } else {
            this.setState({
                key: 'hidden'
            })
        }
    }

    render(){
        
        const categories = ['School', 'Relationship', 'Job', 'Achievement', 'Body Modification', 'Vacation', 'Family', 'Pets', 'Medical', 'Other']
        return(
            <div>
                <Link to='/AddEvent'>Add Event</Link>
                <form>
                    <fieldset>
                        <label>Search: </label>
                        <input type='text'></input>
                        <select id='category'>
                            <option  disabled hidden value='default'>Select</option>
                            {categories.map(i => {
                                return <option id='category' key={i} name='category' value={i}>{i}</option>
                            })}
                        </select>
                    </fieldset>
                </form>
                <button onClick={() =>this.showImgKey()}>Symbol Key</button>
                <div id='myModal' className={this.state.key}>
                    <div className='modal-content'>
                        <p><img src={achievImg} alt='Achievement'/> Achievement</p>
                        <p><img src={modImg} alt='BodyModification'/> Body Modification</p>
                        <p><img src={schoolImg} alt='School'/> School</p>
                        <p><img src={relationImg} alt='Relationship'/> Relationship</p>
                        <p><img src={jobImg} alt='Job'/> Job</p>
                        <p><img src={vacaImg} alt='Vacation'/> Vacation</p>
                        <p><img src={familyImg} alt='Family'/> Family</p>
                        <p><img src={petsImg} alt='Pets'/> Pets</p>
                        <p><img src={otherImg} alt='Other'/> Other</p>
                    </div>
                </div>
                <ul className='yearlist'>
                    {this.listYearsOfLife(Store.UserInfo.userBirthday, Store.events).map(i => {
                    return <li key={i.year} className='yearli'>
                            <img className='arrow' src={rightArrow} alt='right arrow open year'></img>
                            {i.year}&nbsp;
                            {i.Achievement > 0 ? <><img src={achievImg} alt='Achievement'/>&nbsp;</>:<span/>}
                            {i.BodyModification > 0 ? <><img src={modImg} alt='BodyModification'/>&nbsp;</>:<span/>}
                            {i.School > 0 ? <><img src={schoolImg} alt='School'/>&nbsp;</>:<span/> }
                            {i.Relationship > 0 ? <><img src={relationImg} alt='Relationship'/>&nbsp;</>:<span/>}
                            {i.Job > 0 ? <><img src={jobImg} alt='Job'/>&nbsp;</>:<span/>}
                            {i.Vacation > 0 ? <><img src={vacaImg} alt='Vacation'/>&nbsp;</>:<span/>}
                            {i.Family > 0 ? <><img src={familyImg} alt='Family'/>&nbsp;</>:<span/>}
                            {i.Pets > 0 ? <><img src={petsImg} alt='Pets'/>&nbsp;</>:<span/>}
                            {i.Medical > 0 ? <><img src={medImg} alt='Medical'/>&nbsp;</>:<span/>}
                            {i.Other > 0 ? <><img src={otherImg} alt='Other'/>&nbsp;</>:<span/>}
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}