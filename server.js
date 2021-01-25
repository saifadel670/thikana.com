var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')

var app = express()
const fs = require('fs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
var server = http.Server(app)
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var dbURL = 'mongodb://localhost:27017/project'
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', function (error) {
    console.log(error)
})
app.use(express.static('public'))
var User = require('./model/user.model.js')
var Product = require('./model/product.model.js')
var Project =  require('./model/project.model.js')
var Data =  require('./model/data.model.js')
const path = require('path')
const { Console } = require('console')
const HTML_DIR = path.join(__dirname)
app.use(express.static(HTML_DIR))
app.set('view engine', 'ejs');

app.get('/', function (request, response) {

    Product.find({}, function (err, data) {
        User.find({userType:'Engineer'}, function (err, engineerData) {
            Project.find({}, function (err, projectData) {
                response.render('customerHome.ejs',{ 
                product: data,
                project:projectData,
                engineer: engineerData,
                customer: {
                    _id:"nan",
                    name:"n/a",
                    email:"n/a",
                    phoneNumber:"n/a" ,
                    description:"n/a",
                    image: '/client/images/avatar.png',
                    address: "n/a"
                    },
                message:{}
              })
            })
        })
    })
})

app.get('/signInUp', function (request, response) {
    response.render('signInUp.ejs')
})

app.get('/change', function (request, response) {
    response.sendFile(__dirname+'/client/signInUp.html')
})


app.get('/user/account', function (request, response) {
    User.find({}, function(err,data){
        if(err){
            return response.status(400).json({
                error:'data is missing'
            })
        }
        return response.status(200).json(JSON.stringify(data))
    })
})


app.get('/user/account/:email', function (request, response) {
    User.findOne({email:request.params.email}, function(err,data){
        if(err){
            return response.status(400).json({
                error:'data is missing'
            })
        }
        return response.status(200).json(JSON.stringify(data))
    })
})

app.get("/notification/receive/:id", function(request,response){
    Data.find({receiver:request.params.id},function(err,data){
        if(err){
            return response.status(400).json({
                error:'data is missing'
            })
        }
        return response.status(200).json(JSON.stringify(data))
    })
})



app.get('/render/change/:id', function (request, response) {

        User.findById(request.params.id, function(error, info){
            if(error){
                return response.status(400).json({
                    error:'data is missing'
                })
            }

            if(info.userType === 'Seller'){
                Product.find({sellerId: request.params.id}, function (err, data) {
                  Data.find({receiver:request.params.id},function(err,message){
                    response.render('sellerDashboard.ejs',{ 
                    product: data,
                    seller: info,
                    message:message
                        })
                    })
                })
            }
            else if(info.userType === 'Engineer'){
                Project.find({engineerId: request.params.id}, function (err, data) {
                    Data.find({receiver:request.params.id},function(err,message){
                        
                        response.render('engineerDashboard.ejs',{ 
                        project: data,
                        engineer: info,
                        message:message
                        })
                        })
                })

            }
            else if(info.userType === 'Customer'){
                Product.find({}, function (err, data) {
                    User.find({userType:'Engineer'}, function (err, engineerData) {
                        Project.find({}, function (err, projectData) {
                            Data.find({receiver:request.params.id},function(err,message){
                               
                            response.render('customerHome.ejs',{ 
                            product: data,
                            project:projectData,
                            engineer: engineerData,
                            customer: info,
                            message:message
                            })
                          })
                        })
                    })
                })

            }
    
        })  
     
   })



   app.post('/notification/request/engineer', function(request,response){
    
        NewData = Data(request.body)
        NewData.save(function (err, data) {
            if (err) {
                return response.status(400).json({ error: "send request fails" })
            }
            return response.status(200).json({
                message: "successfully added"
            })
    })

   })



app.post('/user/account', function (request, response) {
    NewUser = User(request.body)
    NewUser.save(function (err, data) {
        if (err) {

            return response.status(400).json({ error: "add request fails" })
        }

        return response.status(200).json({
            message: "successfully added"
        })

    })
})

app.post('/seller/product/add', function (request, response) {
    NewProduct = Product(request.body)
    NewProduct.save(function (err, data) {
        if (err) {

            return response.status(400).json({ error: "add request fails" })
        }

        return response.status(200).json({
            message: "successfully added"
        })

    })
})

app.post('/engineer/project/add', function (request, response) {
    NewProject = Project(request.body)
    NewProject.save(function (err, data) {
        if (err) {

            return response.status(400).json({ error: "add request fails" })
        }

        return response.status(200).json({
            message: "successfully added"
        })

    })
})


app.put('/update/user/info/:id', function(request,response){
 User.findByIdAndUpdate(request.params.id,request.body,{new:true },function(err,data){
        if(err){
            response.status(400).json({error:"update request fails"})
          }
           response.status(200).json({
              message:"successfully updated"
          })
    })
})


app.put('/product/purchase/:id', function(request,response){
    Product.findByIdAndUpdate(request.params.id,request.body,{new:true },function(err,data){
           if(err){            
               response.status(400).json({error:"update request fails"})
             }
            
             return response.status(200).json(JSON.stringify(data))
       })
   })

app.put('/accepted/notification/:id', function(request,response){

    Data.findByIdAndUpdate(request.params.id,request.body,{new:true },function(err,data){
           if(err){
               response.status(400).json({error:"update request fails"})
             }
            
              response.status(200).json({
                 message:"successfully updated"
             })
       })
   })

app.delete('/message/user/request/delete/:id',function(request, response){
    Data.findByIdAndRemove(request.params.id, function (err, data) {
        if(err){
         return response.status(400).json({error:"delete request fails"})
        }
        return response.status(200).json({
            message:"successfully deleted"
        })
    })
})

app.delete('/project/remove/:id',function(request, response){
    Project.findByIdAndRemove(request.params.id, function (err, data) {
        if(err){
         return response.status(400).json({error:"delete request fails"})
        }
        return response.status(200).json({
            message:"successfully deleted"
        })
    })
})

server.listen(process.env.PORT || 3000)
process.env.IP || 'localhost', function () {
    console.log("server running")
}