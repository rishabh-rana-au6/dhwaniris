import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import bcrypt from 'bcrypt';






const router = express.Router();


export const registerUser = async (req, res) => {
    const saltRounds = 10
    bcrypt.hash(req.body.password, saltRounds, function (err, hashedPassword) {
        req.body.password = hashedPassword
        console.log(req.body)
        User.create(req.body)
            .then((user, err) => {
                if (err) {
                    res.json({
                        status: 400,
                        message: "Mongodb Cannot create new user",
                        error: err
                    })
                }
                res.json({
                    status: 200,
                    message: "Registration Successful",
                    user: user
                })
            }
            )

    })


}


export const loginUser = async (req, res) => {
    console.log(req.body)
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.json({ message: "User not found" })
        }
        if (!user) {
            res.json({ message: "User not found" })
        }
        else {

            console.log(req.body.password, user.password)
            bcrypt.compare(req.body.password, user.password, (err, result) => {

                console.log(err)
                if (err) {
                    console.log("heyyy")
                    res.status(404).json({ message: "password don't match" })
                }
                else if (result == true) {
                    const token = jwt.sign({ _id: user._id, email: user.email}, 'secret', (err, token) => {
                        User.findByIdAndUpdate(user._id, { token: token } ,  (err, user) => {
                            res.status(200).json({
                                message: "Login Successful",
                                user: user,
                                token: token
                            })

                        })
                           

                    })

                }
                else {
                    res.json({ message: "password don't match" })
                }

            })
        }




    })
}

export const logoutUser = async (req,res) => {
    res.cookie('jwt', '', { maxAge:1});
    res.status(200).json({
        message : "logout successfull"
    })
}



export const getAllState = async (req, res) => {
    console.log(req.body)
    // console.log(req)
    User.find({email : req.body.email }, (err,user) => {
        if (err) {
            res.json({message : "There is some problem, please login again "})
        }
        else {
            // console.log(user)
            // if (!req.headers.authorization){
            //      res.json({
            //          message : "Token expired, please login again"
            //      })
            // }
            // else {
            //     console.log(req.headers.authorization)
            //     console.log(user.token)
            //     console.log(user)
            //     if (user.token == req.headers.authorization) {
            //      console.log("hiiii")
                
                
                    
                        res.status(200).json({
                            State : user[0].state,
                            message : "All good"
                        })
                    }
                })
            }
                
        
    // }}
    //   ) }



export const getAllDistrict = async (req, res) => {
    console.log(req.body)
    // console.log(req)
    User.find({email : req.body.email }, (err,user) => {
        if (err) {
            res.json({message : "There is some problem, please login again "})
        }
        else {
            // if (!req.headers.authorization){
            //      res.json({
            //          message : "Token expired, please login again"
            //      })
            // }
            // else {
            //     console.log(req.headers.authorization)
            //     console.log(user.token)
            //     console.log(user)
            //     if (user.token == req.headers.authorization) {
            //      console.log("hiiii")
                

                        res.status(200).json({
                            District : user[0].district,
                            message : "All good"
                        })
                    }
                })
            }
                
        
    // }}
    //   ) }





export const getAllChild = async (req, res) => {
    console.log(req.body)
    // console.log(req)
    User.find({email : req.body.email }, (err,user) => {
        if (err) {
            res.json({message : "There is some problem, please login again "})
        }
        else {
            // if (!req.headers.authorization){
            //      res.json({
            //          message : "Token expired, please login again"
            //      })
            // }
            // else {
            //     console.log(req.headers.authorization)
            //     console.log(user.token)
            //     console.log(user)
            //     if (user.token == req.headers.authorization) {
            //      console.log("hiiii")
                
                        res.status(200).json({
                            Child : user[0].child,
                            message : "All good"
                        })
                    }
                })
            }
                
        
    // }}
    //   ) }



export const createState = async (req, res) => {

    console.log(req.body) 
    try {
        User.updateOne({email : req.body.email}, { $push: { state: req.body.state } }, (err, user) => {
            
            res.json({
                updatedUser : user
            })
    })
                
       
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createDistrict = async (req, res) => {

    console.log(req.body) 
    try {
        User.updateOne({email : req.body.email}, { $push: { district: req.body.district } }, (err, user) => {
            
            res.json({
                updatedUser : user
            })
    })
                
       
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createChild = async (req, res) => {

    console.log(req.body) 
    try {
        User.updateOne({email : req.body.email}, { $push: { child: req.body.child } }, (err, user) => {
            
            res.json({
                updatedUser : user
            })
    })
                
       
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export default router;
