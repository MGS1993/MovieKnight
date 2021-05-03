import React from 'react';


const UpdatedTag = props => {

  const mainWrapper = {
    height: '25px',
    width: '95px',
    backgroundColor: '#088e08',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '15px',
    color: 'white',
    left: "0px",
    right: "0px",
    top: '20px',
    zIndex: '1',
    order: '1'
  }

  const pStyle = {
    fontWeight: 'bold',
    Color: 'white',
    margin: '0px',
  }

  return(
    <div style={mainWrapper}>

      <p style={pStyle}>New Episode</p>

    </div>
  )
}



export default UpdatedTag