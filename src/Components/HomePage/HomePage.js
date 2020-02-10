import React, { Component } from 'react';
import UserContext from '../../Context/user-context';
import { Link } from 'react-router-dom';
import rightArrow from '../../Images/rightArrow.png';
import Footer from '../Footer/Footer';
import './HomePage.css';
import achievImg from '../../Images/002-award.png';
import modImg from '../../Images/005-mom.png';
import familyImg from '../../Images/007-family.png';
import homeImg from '../../Images/Home.png';
import jobImg from '../../Images/001-job.png';
import medImg from '../../Images/009-medical.png';
import petsImg from '../../Images/008-pets.png';
import relationImg from '../../Images/003-relationship.png';
import schoolImg from '../../Images/004-school.png';
import vacaImg from '../../Images/006-vacation.png';
import otherImg from '../../Images/010-other.png';

export default class Home extends Component {
    static contextType = UserContext;
    constructor(props){
        super(props)
        this.state ={
            key: 'hidden',
        }
    }
    
    listYearsOfLife(year, events){
        let yearlist = []
        
        for(let i = 2020; i>= parseInt(year); i--){
            yearlist.push({year: i, Achievement: 0,  BodyModification: 0, Family: 0, Home: 0, Job: 0, Medical: 0,  Pets: 0, Relationship: 0, School: 0,  Vacation: 0,  Other: 0})
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

    handleClick = (e) => {
        var dropdown = document.getElementById('myModal')
        if(e.target !== dropdown && e.target.parentNode !== dropdown){
            e.preventDefault()
            this.setState({
                key: 'hidden'
            })
            return;
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick)
    }

    render(){
        
        const categories = ['Achievements', 'Body Modification', 'Family', 'Home', 'Job', 'Medical', 'Pets', 'Relationship', 'School', 'Vacation', 'Other']
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
                        <p><img src={familyImg} alt='Family'/> Family</p>
                        <p><img src={homeImg} alt='Home'/> Home</p>
                        <p><img src={jobImg} alt='Job'/> Job</p>
                        <p><img src={medImg} alt='Medical'/> Medical</p>
                        <p><img src={petsImg} alt='Pets'/> Pets</p>
                        <p><img src={relationImg} alt='Relationship'/> Relationship</p>
                        <p><img src={schoolImg} alt='School'/> School</p>
                        <p><img src={vacaImg} alt='Vacation'/> Vacation</p>
                        <p><img src={otherImg} alt='Other'/>Other</p>
                    </div>
                </div>
                <div className='yearlist'>
                    {this.listYearsOfLife(this.context.birthyear, this.context.events).map(i => {
                    return <Link to={`/Year/${i.year}`} key={i.year} className='yearli'>
                            <img className='arrow' src={rightArrow} alt='right arrow open year'></img>
                            {i.year}&nbsp;
                            {i.Achievement > 0 ? <><img src={achievImg} alt='Achievement'/>&nbsp;</>:<span/>}
                            {i.BodyModification > 0 ? <><img src={modImg} alt='BodyModification'/>&nbsp;</>:<span/>}
                            {i.Family > 0 ? <><img src={familyImg} alt='Family'/>&nbsp;</>:<span/>}
                            {i.Home > 0 ? <><img src={homeImg} alt='Home'/>&nbsp;</>:<span/>}
                            {i.Job > 0 ? <><img src={jobImg} alt='Job'/>&nbsp;</>:<span/>}
                            {i.Medical > 0 ? <><img src={medImg} alt='Medical'/>&nbsp;</>:<span/>}
                            {i.Pets > 0 ? <><img src={petsImg} alt='Pets'/>&nbsp;</>:<span/>}
                            {i.Relationship > 0 ? <><img src={relationImg} alt='Relationship'/>&nbsp;</>:<span/>}
                            {i.School > 0 ? <><img src={schoolImg} alt='School'/>&nbsp;</>:<span/> }
                            {i.Vacation > 0 ? <><img src={vacaImg} alt='Vacation'/>&nbsp;</>:<span/>}
                            {i.Other > 0 ? <><img src={otherImg} alt='Other'/>&nbsp;</>:<span/>}
                        </Link>
                    })}
                </div>
                <Footer/>
            </div>
        )
    }
}