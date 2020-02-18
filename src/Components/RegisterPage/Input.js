import React from 'react';


export default function Input(props) {
    const categories = ['Achievements', 'Body Modification', 'Family', 'Home', 'Job', 'Medical', 'Pets', 'Relationship', 'School', 'Vacation', 'Other']
    return(
        <div>
            <label>Date </label><br/>
            <input type='date' id='date'/>
            <br/>
            <label>Event name </label><br/>
            <input type='text' id='eName' placeholder={props.placeholder} size="28"/>
            <br/>
            <label>Category </label><br/>
            <select id='category'>
                <option hidden defaultValue>Select</option>
                {categories.map(i => {
                    return <option id='category' key={i} name='category' value={i}>{i}</option>
                })}
            </select>
            <br/>
            <label>Notes </label><br/>
            <textarea id='notes' name='notes' type='textbox' cols='40' rows='4'/>
        </div>
    )
}