import React from 'react';


export default function Input(props) {
    const categories = ['Achievements', 'Body Modification', 'Family', 'Home', 'Job', 'Medical', 'Pets', 'Relationship', 'School', 'Vacation', 'Other']
    return(
        <div>
            <label>Date </label>
            <input type='month' id='date'/>
            <br/>
            <label>Event name </label>
            <input type='text' id='eName' placeholder={props.placeholder} size="28"/>
            <br/>
            <label>Category </label>
            <select id='category'>
                <option hidden defaultValue>Select</option>
                {categories.map(i => {
                    return <option id='category' key={i} name='category' value={i}>{i}</option>
                })}
            </select>
            <br/>
            <label>Notes </label>
            <input id='notes' type='textbox' size='44'/>
        </div>
    )
}