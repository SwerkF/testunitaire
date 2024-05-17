import React, { useState, useEffect } from 'react';
import "../styles/Input.css";
const Input = (props) => {
    // props text, placeholder, type, onChange, value, label, inputstyle, labelstyle

    return (
        <div className="d-flex flex-column">
            {props.label && <label htmlFor={props.label} className={props.labelstyle ? `custom-label text-left ${props.labelstyle}` : "custom-label text-left"} >{props.label}</label>}
            <input name={props.label} className={props.inputstyle ? `custom-input ${props.inputstyle}` : "custom-input"} type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
        </div>
    )
}

export default Input;