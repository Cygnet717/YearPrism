import React, { Component } from 'react';
import Store from '../dummy-store';

export default class YearView extends Component{
    static defaultProps ={
        match: { params: {}},
    };

    constructor(props){
        super(props)
        this.state ={
            yearEvents : null,
        }
    }

    componentDidMount(){
        const { year }= this.props.match.params.year

        //fetch(what happened this year)
        //.then((yearEvents) => {
        //    this.setState(() => ({ yearEvents }))
        //})  
    }

    render(){
        return(
            <div>
                <h3>{this.props.match.params.year}</h3>
                {Store.events.map(i => {
                    console.log(i.year)
                    if(parseInt(i.eventYear) === parseInt(this.props.match.params.year)){
                    return <div>{i.eventMonth} {i.eventName}  {i.notes}</div>
                    }
                    return<></>
                })}
            </div>
        )
    }
}