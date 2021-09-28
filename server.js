const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const User = require("./models/User");
const mongoose = require("mongoose");
const Task = require("./models/Task");
const cors = require('cors');



const app = express()
app.use(express.json());
app.use(cors())


// mongoose
mongoose.connect("mongodb+srv://kevin:Kjh7717180@cluster0.oqv1q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })


//home route
app.get('/', (req, res) => {
  const user = {
    username: "deakin",
    password: "sit313",
  }
  res.send(user)
})

//register route
app.post('/register', (req, res) => {

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  user.save()
    .then(() => res.json({ message: 'saved to db: ' + user }))
    .catch((err) => res.status(400).json(err));

})

//login route
app.post('/login', (req, res) => {
  User.findOne({ username: req.body.username }, (error, user) => {
    if (user != null) {
      if (!user.password.localeCompare(req.body.password)) {
        res.json('success');
      }
      else {
        res.status(400).json({ err: 'Password is wrong!' })
      }
    } else {
      res.status(400).json({ err: 'Username is not registered!' })
    }
  });
});


app.post('/createTask', function(req, res) {
  const newtask = req.body;
  const task = new Task(newtask);
  task.save()
    .then(() => res.json(task))
    .catch(err => res.json(err))
})

app.get('/alltasks', function(req, res) {
  Task.find({}).then((tasks) => {
    return res.json(tasks)
  }).catch(err => res.json(err))
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, (req, res) => {
  console.log("Server is running successfullly!")
})
