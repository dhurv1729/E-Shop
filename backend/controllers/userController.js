import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import genrateToken from '../utils/genrateToken.js'

export const authUser = asyncHandler(async(req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genrateToken(user._id)
    })
  }
  else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
})

export const registerUser = asyncHandler(async(req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if(userExists) {
    res.status(400)
    throw new Error('User is already exists');
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genrateToken(user._id)
    })
  }

  else {
    res.status(400);
    throw new Error('Invalid user data');
  }

})

export const updateUserProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id);

  user.name = req.body.name || user.name
  user.email = req.body.email || user.email
  if(req.body.password) {
    user.password = req.body.password
  }

  const updateUser = await user.save();

  if(user) {
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: genrateToken(updateUser._id)
    })
  }
  else {
    res.status(404);
    throw new Error('User not found');
  }
  
})

export const getUserProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id);
  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genrateToken(user._id)
    })
  }
  else {
    res.status(404);
    throw new Error('User not found');
  }
  
})

export const getUsers = asyncHandler(async(req, res) => {
  const users = await User.find({});
  res.json(users);
    
})

export const deleteUserById = asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id);
  if(user) {
    await user.remove();
    res.json({message: 'user deleted successfully'})
  }
  else {
    res.status(404)
    throw new Error('User not found');
  }
  res.json(users);
    
})

export const getUserByID = asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id);
  if(user) {
    res.json(user)
  }  
  else {
    res.status(404)
    throw new Error('User is not found')
  }

})

export const userUpdate = asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id);
  if(user) {

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin != null ? req.body.isAdmin : user.isAdmin

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  }
  else {
    res.status(404);
    throw new Error('User not found');
  }
})

