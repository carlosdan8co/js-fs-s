const router=require('express').Router();
const {unlink} = require('fs-extra');
const path = require('path');
const cloudinary=require('cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_NAME,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const Book=require('../models/Book');

router.get('/',async (req,res)=>{
    console.log(Book);
    const books = await Book.find();
    res.json(books);
});

router.post('/',async(req,res)=>{
    const {title, author, isbn}=req.body;
    console.log(req.file.path)

    const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(result.url)
    const newBook = new Book({title, author, isbn,imagePath:result.url});
    await newBook.save();
    await unlink(req.file.path);
    res.json({message:'Book Saved'});
});

router.delete('/:id',async(req,res)=>{
    const book = await Book.findByIdAndDelete(req.params.id);
    const result =await cloudinary.v2.uploader.destroy(book.id);
    //await unlink(path.resolve('./backend/public'+book.imagePath));
    console.log(book);
    res.json({message:'Book Deleted'});
})

module.exports=router;