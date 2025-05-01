const {Router}=require('express');
const {UserModel}=require('../models/user')


const router=Router();



router.get('/',(req,res)=>{
    try {
        return res.json({
            test:"Hiii"
        })
        
    } catch (error) {
        return res.status(400).json({
            error:error
        })
    }
})
module.exports=router;