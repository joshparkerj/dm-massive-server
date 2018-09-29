const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

massive('postgres://cauxwinhlsyscp:34e29bd1e196393b09f46149f0c064ad24a169ed8bb52cb65ae7cdae07898131@ec2-50-16-196-57.compute-1.amazonaws.com:5432/d217ebj7fjalrm?ssl=true')
  .then( db => {
    app.set('db',db)
    console.log('database is connected');
    /*
    db.create_table()
      .then(() => {
        console.log('table is created');
      })
    */
  })
  .catch(err => {
    console.error(err);
    console.log('database connection error');
  })

app.post('/add', (req,res) => {
  const {user_name, email} = req.body;
  console.log(user_name,email);
  const db = req.app.get('db');

  db.insert_data([user_name,email])
    .then(() => {
      res.send('saved data successfully');
    })
    .catch(err => {
      res.status(500).send(err);
    })

  //res.send('thanks for posting!');
})








app.get('/getData', (req,res) => {
  const db = req.app.get('db');

  db.get_all()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send();
    })
})


app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})