const User = require('../Models/userModels');
const hashPassword = require('../utils/hashedPassword');
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function addUser(req, res) {
  const {username, email, password, role_id} = req.body;

  try{
    const result = await User.createUser(username, email, password, role_id);

    res.status(201).json({
      message: "User registered Successfully",
      userId: result.insertId,
    });
  }catch(err){
    console.error('Error creating user: ',err);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try{
    const result = await User.updateUser(id, { username, email, password });

    if (result.affectedRows === 0){
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(201).json({
      message: "User updated Successfully",
    });
  }catch(err){
    console.error('Error creating user: ',err);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try{
    const result = await User.deleteUser(id);

    if (result.affectedRows === 0){
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(201).json({
      message: "User deleted Successfully",
    });
  }catch(err){
    console.error('Error creating user: ',err);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

async function getUser(req, res) {

  try{
    const { email, password } = req.body;

    const user = await User.getUserByEmail(email);

    if (!user){
      return res.status(404).json({ message: 'User not found' })
    }
    const isMatch = hashPassword.comparator(password, user.password);
    console.log("Entered password:", password);
    console.log("Stored password:", user.password);


    if (!isMatch){
      return res.status(401).json({message: 'Invalid password'})
    }

    const token = jwt.sign({id: user.id, email: user.email}, process.env.MY_SEC, {expiresIn: '1d'})

    res.status(200).json({message: 'Login Successful', token})
  }catch(err){
    console.error('Error creating user: ',err);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}


module.exports = {addUser, updateUser, deleteUser, getUser}