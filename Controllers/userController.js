const userModel = require('../models/userModel');
const bcrypt = require("bcrypt");


exports.login = async (req, res, next) => {
  
  try {
    const {userName, passWord } = req.body;
    const user = await userModel.findOne({userName: userName.trim()})
    if ( userName === '' || passWord === '' ) {
      return res
      .status(400)
      .json({msg: 'Not all fields have been entered.'})
    }
    if (user === null) {
      return res
      .status(404)
      .json({msg: 'Password or User is incorrect'})
    }
    if( await bcrypt.compare(passWord, user.passWord.trim())) {
      return res
     .send({user})
     .status(200)
     
   } else {
     res.status(404)
     res.json({msg: 'Password or User is incorrect'})
   } 
  }catch(err) {
    console.log(err)
  }
}

exports.create_user = async (req, res, next) => {
try {
  const { userName, passWord, passWordCheck } = req.body;
  if(!userName || !passWord || !passWordCheck ) {
    return res
    .status(400)
    .json({msg: "Not all fields have been entered."})
  }
  if(passWord.length < 5) {
    return res
    .status(400)
    .json({msg: "Password needs to be at least 5 characters long"})
  }
  if(passWord !== passWordCheck) {
    return res
    .status(400)
    .json({msg: "Passwords do not match"})
  }
  const existingUser = await userModel.findOne({userName:userName})
        if(existingUser) {
          return res
          .status(400)
          .json({msg: "UserName already taken"})
        } 

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(passWord, salt);

  let user = new userModel(
    {
      userName: userName,
      passWord: passwordHash,
    }
  )
  //Lesson: In order to return a status you must als return JSON
  user.save( await function(err) {
    if (err) {
      res.status(500).json({msg: 'Internal server error possibly'})
    } else {
      res
        .json({
        msg: 'data saved'
      })
        .status(200)
    }
  })
}catch(err) {
  res.status(500)
  console.log(err)
}
}