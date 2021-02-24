import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors'
import './models/db.connect.js'
import {registerUser, loginUser,logoutUser, getAllState, getAllDistrict, getAllChild, createState, createDistrict, createChild } from './controllers/userctrl.js';


const app = express()

app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors())


app.post('/registerUser', registerUser);
app.post('/loginUser', loginUser);
app.post('/logoutUser',logoutUser)
app.post('/getAllState', getAllState);
app.post('/getAllDistrict', getAllDistrict);
app.post('/getAllChild', getAllChild);
app.post('/createState', createState);
app.post('/createDistrict', createDistrict);
app.post('/createChild', createChild);

app.listen(3000, () =>{
    console.log('I AM Running On 3000')
} )
