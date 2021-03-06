import React, { useState } from 'react';
import styles from './Login.module.css';
import TextInput from '../../Inputs/TextInput';

const Login = props => {
  const [moduleRender, setModuleRender] = useState('login');
  const [ userName, setUserName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [registerUserName, setRegisterUserName] = useState("");
  const [registerPassWord1, setRegisterPassWord1] = useState("");
  const [registerPassWord2, setRegisterPassWord2] = useState("");
  const [ errmsg, setErrmsg ] = useState('');
  let rendered
  const handleLogin = async (e) => {
    try {
      e.preventDefault()
      let dataBody = {
        userName: userName,
        passWord: password
      }
      const response = await fetch('api/login', {
        method: 'POST',
        body: JSON.stringify(dataBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (response.status !== 200 ) {

        setErrmsg(data.msg)
      }

      if(response.status === 200) {
        localStorage.setItem('user', data.user.userName);
        localStorage.setItem('userId', data.user._id);
        props.setShowLogin(false)
      }
      if( response.status === 200 ) {
        window.location.reload();
      }
      
    }catch(err) {
      console.log(err)
    }
  }
  const handleKeyPress = event => {
    //TODO: make handleKeyPress work on either register or login
    if(event.key === 'Enter') {
      handleLogin(event)
    }
  }

  const handleRegister = async (e) => {
    try {
      e.preventDefault()
      let dataBody = {
       userName: registerUserName,
       passWord: registerPassWord1,
       passWordCheck: registerPassWord2,
      }
     
      const response = await fetch('api/create_user', {
        method: 'POST',
        body: JSON.stringify(dataBody),
        headers: {
          'Content-Type': 'application/json'
        }
      }) 
      const data = await response.json();

      if (response.status !== 200 ) {
        setErrmsg(data.msg)
      }
      setRegisterUserName('');
      setRegisterPassWord1('');
      setRegisterPassWord2('');

      if (response.status === 200) {
        setModuleRender('login');
      }
    } catch(err) {
      console.log(err)
    }
  }
  if (moduleRender === 'login') {
    rendered = (
      <div>
        <div className={styles.header}>
          <h2>Log in</h2>
        </div>
        {errmsg !== '' ? <p className={`${styles.errorText} `}>{errmsg}</p> : null}
        <form onKeyPress={handleKeyPress}>
        <TextInput
          labelName="User"
          inputType='text'
          inputName='user'
          value={userName}
          changed={(e) => setUserName(e.target.value)} />

        <TextInput
          labelName="Password"
          inputType='password'
          inputName='password'
          value={password}
          changed={(e) => setPassword(e.target.value)} />
          
        </form>
        <div className={styles.registerLink}>
        <button className={styles.btn} onClick={(e) => handleLogin(e)}>Login</button>
        <button className={styles.btn} 
        onClick={() => setModuleRender('register')}>Register</button>
        </div>
      </div>
    )
  } else {
    rendered = (
      <div>
        <div className={styles.header}>
          <h2>Register</h2>
        </div>
        {errmsg !== '' ? <p className={`${styles.errorText}`}>{errmsg}</p> : ''}
        <form>
          <TextInput 
          labelName="Register username"
          inputType="text"
          inputName="user"
          value={registerUserName}
          changed={(e) => setRegisterUserName(e.target.value)} />
          <TextInput
          labelName="Password"
          inputType='password'
          inputName='password1'
          value={registerPassWord1}
          changed={(e) => setRegisterPassWord1(e.target.value)} />
          <TextInput
          labelName="Verify password"
          inputType='password'
          inputName='password2'
          value={registerPassWord2}
          changed={(e) => setRegisterPassWord2(e.target.value)} />
          </form>
          <button className={styles.btn} onClick={(e) => handleRegister(e)}>Register</button>
        
      </div>
    )
  }
  


  return (
    <div className={styles.loginMainWrapper}>
      {rendered}
    </div>

  )
}


export default Login