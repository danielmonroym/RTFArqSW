
const express = require("express");
const app = express();
const body_parser = require("body-parser");

// parse JSON (application/json content-type)
app.use(body_parser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(body_parser.json());    
app.set('view engine', 'ejs')
const port = 4000;

// << db setup >>
const db = require("./db");
const dbName = "dbtest";
const collectionName = "test";

/// << db init >>
db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
    // get all items
  

    // << db CRUD routes >>
    
app.get('/', (req,res)=>{

    res.render('index.ejs');
      
});
app.get('/usuarios', (req,res)=>{
    dbCollection.find().toArray()
    .then(results => {
      res.render('usuarios.ejs',{results})
      })
      .catch(err => console.error(err));
    
   
    
});
app.get('/registro', (req,res)=>{

    res.render('registro.ejs');
      
});
app.put('/usuarios', (req, res) => {
    dbCollection.findOneAndUpdate(
        { documento: req.body.documento},
        {
        $set: {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            email: req.body.email
        }
         },
       {
           upsert:true
       }
      )
        .then(result => {
            res.json('Success')
        })
        .catch(error => console.error(error))
  });
  app.delete('/usuarios', (req, res) => {
    dbCollection.deleteOne(
      { documento: req.body.documento }
    )
      .then(result => {
          if(result.deletedCount === 0){
            return res.json('No hay usuarios para borrar')
          }
        res.json(`Deleted documento ${req.body.documento} `)
      })
      .catch(error => console.error(error))
  });

app.post('/registro', (req, res) => {
    dbCollection.insertOne(req.body)
    .then(result => {
       res.redirect('/')
    })
        .catch(err => console.error(err));
  })
  
  
}, function(err) { // failureCallback
    throw (err);
});

app.listen(port, () => {
    console.log(`Server listening at ${port}`);
});