if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRoute = require('./router/userRoute');
const loginRoute = require('./router/signin');
const signoutRoute = require('./router/signout');
const likesRoute = require('./router/likes');
const postRoute = require('./router/post');
const findRoute = require('./router/find');
const addRoute = require('./router/add');
const imgRoute = require('./router/upload');
const session = require('express-session');
const User = require('./model/user');
const override = require('method-override');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongo');
const app = express();
const secret = process.env.cSecret || 'kendnaal';
const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/chillmaar';
 
// Mongoose Connections Params
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DB Connected")
});

const store = new MongoDBStore({
  mongoUrl: dbURL,
  secret,
  touchAfter: 24 * 60 * 60
});

store.on("error", function(e){
  console.log("Session Store error", e);
});

const sessionOption = {
  store,
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie:{
    httpOnly: true,
    expries: Date.now()+1000*60*60*24*7,
    maxAge: 1000*60*60*24*7
    }
};
app.use(session(sessionOption));
const port = process.env.PORT || 3000;
app.listen(port, ()=>{console.log(`Server is UP on PORT - ${port}`)});

app.set('views', path.join(__dirname,'/layout'));
app.set('view engine', 'ejs');

app.use(flash());
app.use(override('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));

app.use((req,res,next)=>{
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/signup', userRoute);
app.use('/signin', loginRoute);
app.use('/signout', signoutRoute);
app.use('/post', postRoute);
app.use('/likes', likesRoute);
app.use('/find', findRoute);
app.use('/add', addRoute);
app.use('/upload', imgRoute);

app.use((req,res,next)=>{
  res.locals.fname = req.session.fname;
  res.locals.lname = req.session.lname;
  res.locals._id  = req.session._id;
  next();
});

app.get('/', async(rq, rs)=>{
    if(rq.session.username){
      const user = await User.findById(rq.session._id).populate({path: 'friends', populate: {path :'friends'}})
                  .populate({path: 'posts', populate: {path: 'liked'}}).populate({path: 'friends', populate: {path :'posts'}})
                  .populate({path: 'friends', populate: {path: 'posts', populate: {path: 'liked'}}});
      return rs.render('main', {user});

    }
    rs.render('Home');
})









