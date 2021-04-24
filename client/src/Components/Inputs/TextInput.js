import React from 'react';
import styles from './TextInput.module.css';


const Input = props => (
  <div className={styles.mainInputWrapper}>
    <label>
      {props.labelName}
    </label>
    <input
    type={props.inputType}
    name={props.inputName}
    style={props.style}
    value={props.value}
    onChange={props.changed}
    onClick={props.clicked} />
  </div>
) 


export default Input