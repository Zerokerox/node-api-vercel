//path
const path = require('path')
const express = require('express')
const router = express.Router();
//call product model to use
const Product = require('../models/product')

//to delete image file
const fs = require('fs');

// upload file
const multer = require('multer')

const storage =  multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images/products')

    },
    filename:function(req,file,cb){
        cb(null,Date.now()+".jpg")//name

    }
})

const upload = multer({
    storage:storage
}) 
router.get('/',(req, res)=>{
    Product.find().exec((err,doc)=>{
        res.render('index',{products:doc})
    })
})


router.get('/add-product', (req, res)=>{
    res.render('form')
})

router.get('/manage', (req, res)=>{
    Product.find().exec((err,doc)=>{
        res.render('manage',{products:doc})
    })
})

router.get('/delete/:id', (req, res)=>{
    Product.findByIdAndDelete(req.params.id,{useFindAndModify:false}).exec((err,doc)=>{
        if(err) console.log(err)
        fs.unlink(path.join(__dirname,'../public/images/products/',doc.image),err=>{
            if(err) console.log(err)
        })
        res.redirect('/manage')
    })
})

router.post('/insert',upload.single('image'),(req, res)=>{
    let data = new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.file.filename,
        description:req.body.description
    })
    
    Product.saveProduct(data,(err)=>{
        if(err) console.log(err)
        res.redirect('/')
    })


})

router.get('/:id',(req,res)=>{
    const product_id = req.params.id
    Product.findOne({_id:product_id}).exec((err, doc)=>{
        res.render('product',{product:doc})
        
    })
    
})

router.post('/edit',(req,res)=>{
    const edit_id = req.body.edit_id
    Product.findOne({_id:edit_id}).exec((err,doc)=>{
        //get old data and send to edit form
        res.render('edit',{product:doc})
    })
})

router.post('/update',(req,res)=>{
    const update_id = req.body.update_id
    let data = {
        name:req.body.name,
        price:req.body.price,
        description:req.body.description
    }
    //update data
    Product.findByIdAndUpdate(update_id,data,{useFindAndModify:false}).exec(err=>{
        res.redirect('/manage')
    })
})


module.exports = router; 