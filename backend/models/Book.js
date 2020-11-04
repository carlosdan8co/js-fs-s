const {Schema, model}= require('mongoose');

const BookSchema=new Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    isbn:{type:String,required:true},
    imagePath:{type:String,required:true},
    created_at:{type:Date,required:true}
});

module.export=model('Book',BookSchema);