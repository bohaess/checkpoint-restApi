const mongoose=require('mongoose') ;

const userSchema=new mongoose.Schema({
    firstName:{
        type:String ,
        length:12
    } ,
    lastName:{
        type:String ,
        length :12
    },
    age:{
        type:Number ,
        max:99 ,
        min:1
    } ,
    nationality:String 
}) ;

module.exports=new mongoose.model('User',userSchema) ;