const express=require('express') ;
const mongoose=require('mongoose') ;
const app=express() ;
const User=require('./models/User')
// const port=4000 ;
require('dotenv').config({path:"./config/.env"}) ;
const port=process.env.PORT ;
const mongoUrl=process.env.MONGO_URL ;

//database connection 
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  (err)=>{
      if(err) console.log(err) 
      else {
          console.log("Connected to the database !!") ;
      }
  })
  //middleware for json format 
  app.use(express.json()) ;
//route for getting all users 
app.get('/users',(req,res)=>{
    User.find()
    .then(doc=>{
        res.send(doc)
        console.log(doc) ;
    })
    .catch(err=>{
        console.log(err) ;
    })
})
//route for add new user 
app.post('/newUser',(req,res)=>{
    const newUser=new User(req.body) ;
    newUser.save()
    .then(doc=>{
        res.send(doc) ;
        console.log("new user added :" ,newUser) ;
    })
    .catch(err=>{
        console.log(err)
    })
})

//route for adding many users 
app.post('/newUsers',(req,res)=>{
    const arrayOfUsers=req.body ;
    User.create(arrayOfUsers,(err)=>{
        if(err) {
            console.log(err)
        }
        else {
            console.log("List added successfully !") ;
        }
    })
    
})

//route for findone user by id and update 
app.post('/update/:id',(req,res)=>{
    User.findByIdAndUpdate({_id:req.params.id},{age:20})
    .then(doc=>{
        res.send(doc)
    })
    .catch(err=>{
        console.log(err)
    })
})

//route for removing one user 
app.post('/remove/:id',(req,res)=>{
    User.findByIdAndRemove({_id:req.params.id})
    .then(doc=>{
        res.send(doc) ;
        console.log("You have removed this document",doc)
    })
    .catch(err=>{
        console.log(err)
    })
})
app.listen(port,(err)=>{
    if(err) throw err ;
    console.log(`Server is runnig on port ${port}`)
}) ;
