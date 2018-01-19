'use strict';
const PORT = 9000;
const express = require('express');
const bodyParser= require('body-parser');

console.log('hello');

const app = express();

app.use(
	'/',
	express.static(__dirname + '/app')
);

app.use(
	'/node_modules',
	express.static(__dirname + '/node_modules')
);

app.use(bodyParser.json());



var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'coco',
  database : 'db_todolist'
});




app.listen(PORT);

app.get('/todos', function(req, res){
	
	connection.query('SELECT * FROM todo', function (error, results, fields) {
	  if (error) throw error;
	  console.log(results.length);
	  //console.log('The solution is: ', results[0].title);
	  res.send(results);
	});

});







app.get('/todos/:id', function(req, res){
	
	connection.query('SELECT * FROM todo WHERE `title` = ?', req.params[0], function (error, results, fields) {
	  if (error) throw error;
	  console.log(results.length);
	  //console.log('The solution is: ', results[0].title);
	  res.send(JSON.stringify(results));
	});

});




app.post('/todos', function(req, res){
	
	//connection.connect();

	console.log("POSSTTTTTTT");
	var query = connection.query('INSERT INTO todo SET ?', req.body, function (error, results, fields) {
	  if (error) throw error;
	  //console.log(results.length);
	  //console.log('The solution is: ', results[0].title);
	  let mytodo = req.body;
	  res.send(mytodo);
	});
});



app.delete('/todos', function(req, res){
	console.log("DELETE");
	let mytodoId = req.body.idTodo;
	console.log(mytodoId);
	var query = connection.query('DELETE FROM todo WHERE `idtodo` = ?' , mytodoId, function (error, results, fields) {
	  if (error) throw error;
	  //console.log(results.length);
	  //console.log('The solution is: ', results[0].title);
	  res.send(mytodoId);
	});
});





app.put('/todos',function(req, res){
	console.log("UPDATE");
	let mytodoUpdated =req.body ;
	console.log(mytodoUpdated);
	var query = connection.query('UPDATE todo SET title = ?, isactive = ? WHERE idtodo = ?', [req.body.title, req.body.isactive,req.body.idToChange], function (error, results, fields) {
	  if (error) throw error;
	  res.send(mytodoUpdated);
	});
});

app.put('/todos/updatealltodo',function(req, res){
	console.log("UPDATE ALL");
	let mytodoIsActiveUpdated = req.body.isactive ;
	console.log(mytodoIsActiveUpdated);
	var query = connection.query('UPDATE todo SET isactive = ? ', mytodoIsActiveUpdated, function (error, results, fields) {
	  if (error) {
	  	console.log("erreur " + error);
	  	return error;
	  }
	  res.json(mytodoIsActiveUpdated);
	});
});




console.log(`--------------------------------------------------
| The root folder is: '${__dirname}/app'
| You can access the application at: http://localhost:${PORT}
---------------------------------------------------------------`);
