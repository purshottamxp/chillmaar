const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRoute = require('./router/userRoute');
const loginRoute = require('./router/signin');
const session = require('express-session');

// Mongoose Connections Params
mongoose.connect('mongodb://localhost:27017/chillmaar', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DB Connected")
});

const app = express();
const sessionOption = {
  secret: 'kendnaal',
  resave: false,
  saveUninitialized: true
};

app.listen(3000, ()=>{console.log("Server is UP!")});

app.set('views', path.join(__dirname,'/Layout'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.use(session(sessionOption));
app.use('/signup', userRoute);
app.use('/signin', loginRoute);

app.get('/', (rq, rs)=>{
    if(rq.session.username){
      return rs.render('main');
    }
    rs.render('Home');
})









