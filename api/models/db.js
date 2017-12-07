const mongoose = require('mongoose');
const DBURI = process.env.DBURI;
mongoose.connect(DBURI);

mongoose.connection.on('connected', ()=> {
  console.log('Connected to ', DBURI);

});

mongoose.connection.on('error', (err)=> {
  console.error(error);
});


mongoose.connection.on('disconnected', ()=> {
  console.log('Disconnected from ', DBURI);
})

//BRING IN ALL MONGOOSE MODELS SO WE CAN HAVE SINGLETON THROUGHOUT THE APPLICATION
require('./User');