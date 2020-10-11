const mongoose = require('mongoose');

mongoose
.connect('mongodb://127.0.0.1:27017/xtracker', { 
    useNewUrlParser: true,
    useUnifiedTopology: true    
})
.catch(error => {
    console.error('Connection error', error.message);
})

const db = mongoose.connection;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = db;