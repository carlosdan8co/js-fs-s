const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/jsdb',{
    useUnifiedTopology: true,
    useNewUrlParser:true
})
.then(db=>console.log('DB is connected'))
.catch(err=>console.error(err));
;