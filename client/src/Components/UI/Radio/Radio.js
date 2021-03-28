import React from 'react';
import style from './Radio.module.css';


const Radio = props => (
  <React.Fragment>
    <input type="radio" id={props.id} name="mediaRadio" value={props.id}/>
    <label htmlFor={props.id}>{props.id}</label>
  </React.Fragment>
)

export default Radio