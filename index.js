//import express 
var express = require('express');
var app = express();

app.use(express.json());

//import models defined as student
const Student = require('./models/student');

//CUSTOM MIDDLEWARE
var c = 0;

function get_middleware (req, res, next){
    c++;
    console.log("HTTP Method: GET");
    console.log("Request Number: " + c);
    next();
}

function post_middleware (req, res, next){
    c++;
    console.log("HTTP Method: POST");
    console.log("Request Number: " + c);
    next();
}

function patch_middleware (req, res, next){
    c++;
    console.log("HTTP Method: PATCH");
    console.log("Request Number: " + c);
    next();
}

function delete_middleware (req, res, next){
    c++;
    console.log("HTTP Method: DELETE");
    console.log("Request Number: " + c);
    next();
}





//turn on server on port 8000
var server = app.listen(8000, function(){
    console.log("Server is ON")
})


//Sync method to create table in database
Student.sync().then((result)=>{
    console.log(result);

    Student.bulkCreate([
        {name: 'James Bond', section: 3, gpa: 88, nationality:'British'},
        {name: 'Peter Venkman', section: 1, gpa: 71, nationality:'American'},
        {name: 'Egon Spengler', section: 6, gpa: 99, nationality:'American'},
        {name: 'Ray Stanz', section: 4, gpa: 91, nationality:'Canadian'},
        {name: 'Winston Zedemore', section: 2, gpa: 95, nationality:'American'}
    ]).then(()=> console.log("Student data has been saved"));

 }).catch((err)=>{
     console.log(err);
 });

 

 

 //POST METHOD for adding a new student
 app.post('/students/add_student', post_middleware, (req, res)=>{
    const addStudent = {
         id: req.body.id,
         name: req.body.name,
         section: req.body.section,
         gpa: req.body.gpa,
         nationality: req.body.nationality 
    };
    //After object created, push to array 
    Student.create({name:addStudent.name, section:addStudent.section, gpa:addStudent.gpa, nationality:addStudent.nationality}

    ).then(()=> console.log("New student has been added"));




    res.status(200).send(addStudent);
});



//GET METHOD for all students
app.get('/students', get_middleware, (req, res)=>{
    
    Student.findAll().then((result)=>{
        return res.status(200).send(result);
    }).catch((err)=>{return res.status(500).send(err);})

});


// GET METHOD for student with specific ID
app.get('/students/:id', get_middleware, (req, res)=>{


    Student.findAll({where: {id: req.params.id}}).then((result)=>{
        if(result.length == 0){
            return res.status(404).send("No Records Exist");
        }
        return res.status(200).send(result);
    })
    .catch((err)=>{
        return res.status(500).send(err);
    })

    
    
    
});

 





//PATCH METHOD for updating a student with specific ID
app.patch('/students/update_student/:ID', patch_middleware, (req, res)=>{
    
    Student.findByPk(parseInt(req.params.ID)).then((stu)=>{
        
        if(stu){
            for(let i in req.body){
                stu[i] = req.body[i];
            }
          stu.save().then((result)=>{
            res.status(200).send(result);
            });
            
        } else {
            return res.status(404).send('No Employee Found with that ID')
        }
        
    }).catch((err)=>{
        return res.status(500).send(err)
    }); 





});



//DELETE METHOD for delete a student
app.delete('/students/delete/:id', delete_middleware, (req, res)=>{

    Student.findByPk(parseInt(req.params.id)).then((stu)=>{
        if (stu){
         stu.destroy().then((result)=>{
             return res.status(200).send(result)
         })
        } else {
         return res.status(404).send('No Employee Found with that ID')
        }
     }).catch((err)=>{
         return res.status(500).send(err)
     });


});
            

