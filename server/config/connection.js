const mongoose = require('mongoose'); //

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/financetracker', {
    
        maxPoolSize:50,
        wtimeoutMS:2500,
        useNewUrlParser:true,
        useUnifiedTopology: true
    
});

module.exports = mongoose.connection;