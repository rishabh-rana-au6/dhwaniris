import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new  Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
password:{
    type: String,
    required: true
},
state:{
    type:[],
    required: true
},
district:{
    type:[],
    required: true
},
child:{
    type:[],
    required: true
},
token : {
    type : String
}
})

const User = mongoose.model('User', userSchema)

export default User;
