import React from 'react';


export default function Input(props) {
    const categories = ['Achievements', 'Body Modification', 'Family', 'Home', 'Job', 'Medical', 'Pets', 'Relationship', 'School', 'Vacation', 'Other']
    return(
        <div>
            <span className="input">
                <label>Date</label>
                <input type='month' id='date'/>
            </span>
            <br/>
            <span className="input">
                <label>Event name</label>
                <input type='text' id='eName' placeholder={props.placeholder} size="28"/>
            </span>
            <br/>
            <span>
                <label>Category</label>
                <select id='category'>
                    <option hidden defaultValue>Select</option>
                    {categories.map(i => {
                        return <option id='category' key={i} name='category' value={i}>{i}</option>
                    })}
                </select>
            </span>
            <br/>
            <label>Notes</label>
            <input id='notes' type='textbox' size='44'/>
        </div>
    )
}