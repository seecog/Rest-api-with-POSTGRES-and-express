var pool = require('./db');
var config = require("./config");
var express = require('express');
var app = express();
var route = express.Router();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

route.get('/books', function (req, res) {
    pool.query("SELECT * FROM books", function (err, result) {
        if (err) {
            throw new error(err);
        }
        res.json({
            status: true,
            books: result.rows
        })
    })
})

route.delete("/books/:id",function(req,res){
    var id = req.params.id;
    pool.query("DELETE FROM books WHERE id="+id,function(err,result){
        if(err){
            throw new Error(err);
        }
        res.json({
            status : true,
            message : "record deleted successfully !"
        })
    })
})

route.put('/books/:id',function(req,res){
var id = req.params.id;
var {author,title} = req.body;
var qry = "UPDATE books SET ";
if(author != undefined){
    qry += " author='"+author+"'";
}
if(title != undefined){
    qry += " ,title='"+title+"'";
}

qry += " where id="+id;

console.log('The query is ',qry);
pool.query(qry,function(err,result){
    if(err){
        throw new Error(err);
    }
    res.json({
        status : true,
        message : "Record updated !"
    })
})

})

route.post('/books', function (req, res) {
    const { id, author, title } = req.body;
    pool.query("insert into books (id,author,title) values ($1,$2,$3)", [id, author, title], function (err, result) {
        if (err) {
            throw new Error(err);
        }
        res.json({
            status: true,
            message: "Book record inserted !"
        })
    })
})

app.use('/api', route);
pool.query("SELECT NOW()", function (err, res) {
    console.log('The reponse is ', res.rows);
})

app.listen(config.PORT, function () {
    console.log("Server started at port " + config.PORT);
})