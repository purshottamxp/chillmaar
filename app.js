const express = require('express');

const path = require('path');





const app = express();


app.get('/', (rq, rs)=>{
    rs.render('Home.ejs');
})
app.listen(3000, ()=>{console.log("Server is UP!")});
app.set('views', path.join(__dirname,'/Layout'));
app.set('view engine', 'ejs');
app.use(express.static('./public'));