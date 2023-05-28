const express=require('express');
const router=express.Router();
const userModel=require('../models/user');
/// DB Connection =========>>>

const mongoose=require('mongoose');
const db="mongodb+srv://employee:employee@cluster1.xqb3lal.mongodb.net/";

mongoose.set('strictQuery', true);
mongoose.connect(db,error=>{
    if(error){
      console.log("DB Connection Error")
    }else{
        console.log("DB Connection established");
    }
})

//// END=============================>>>>

router.get('/',(req,res)=>{
    res.send("Hello from API");
});


router.get('/getAll',async (req,res)=>{
    try{
        const posts= await userModel.find()
        res.json(posts)
    }
    catch(err){
        res.json({message:err})
    }
})

/// ===========POST Method===========>>>
router.post('/create',(req,res)=>{
    var userData=req.body;
    let user=new userModel(userData);
    user.save((error,userData)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(userData);
            res.status(200).send(userData);
        }
    })

});
/// ===========Update Method===========>>>
 router.patch('/update/:id',(req,res)=>{
    var userData=req.body;
    var Id=req.params.id;
    userModel.findByIdAndUpdate(Id,userData,(error)=>{
        if(error){
            console.log(error);
        }else{
            res.status(200).send(userData);
        }
    })
 })

// =========== Delete =====================>>>
router.delete('/delete/:id',(req,res)=>{
    var Id=req.params.id;
    userModel.findByIdAndDelete(Id,(error)=>{
        if(error){
            console.log(error);
        }else{
            res.status(200).send("Delete Successfully !!!!");
        }
    })
 })
module.exports=router;