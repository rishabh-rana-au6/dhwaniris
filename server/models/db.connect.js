import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/dhwaniris',{ useNewUrlParser: true, useUnifiedTopology: true})

.then(()=> console.log('connected sucessfully'))
.catch(err => console.log('could not connect'))