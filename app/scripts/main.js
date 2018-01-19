'use strict';


const url = 'http://localhost:9000/todos';
let xhr = new XMLHttpRequest();


 
 let inputTodo = document.querySelector("#txt_addTodo");
 let todoTable = document.querySelector("#todolist table");
 let todoChackUnchekAll = document.querySelector(".fa-caret-down");

 console.log(inputTodo);

 inputTodo.addEventListener("keypress", addTodo);
 todoTable.addEventListener('click', removeTodo);
 
 todoTable.addEventListener('dblclick', allowEditTodo);
 todoTable.addEventListener('keypress', updateValueTodo);
 todoTable.addEventListener('click', updateIsActiveTodo);
 todoChackUnchekAll.addEventListener('click', updateAllIsActiveTodo);





window.onload = function()
{
	getTodoList();
}


//GET TODO
 	 function getTodoList()
	 {
	 	
			xhr.onload = handleGetTodoListRequest;
			xhr.open('GET', url);
			xhr.setRequestHeader('Content-Type',
			'application/json; charset=utf-8');
			xhr.send();
		
	}

	function handleGetTodoListRequest() 
	{
		if(xhr.status !== 200) 
		{
			alert('HTTP error');
			return;
		}
		let resp = xhr.response;
		// array =>
		let todoListVal = JSON.parse(resp);
		console.log(todoListVal);
	
		todoListVal.forEach(function(todoVal) 
		{
			addTodoToHtml(todoVal);
		});
			
	}



//ADD TODO
	


 	function addTodoToHtml(todoVal)
 	{
	 	let todoTitle = todoVal.title;
	 	let todoId = todoVal.idtodo;
	 	let todoIsActive = todoVal.isactive;
	 	

	 	//todo row
	 	var todoTR = document.createElement("TR");
	 	todoTR.setAttribute('data-id', todoId );
	 	todoTR.setAttribute('class', 'Readingmode');
	    todoTable.appendChild(todoTR);

	    //todo cell Icon Checked
	    var todoTDiconChecked = document.createElement("TD");

	    todoTDiconChecked.setAttribute('width', '10%');
	    var iconChecked = document.createElement("input");
	    iconChecked.setAttribute('type', 'checkbox');
	    iconChecked.setAttribute('class', 'inputIsValid');
	    iconChecked.style.width = "40px";
	    iconChecked.style.height = "40px";
	    iconChecked.checked = !!todoIsActive;

	    todoTDiconChecked.appendChild(iconChecked);
	   

	     //todo cell Todo
	    var todoTDtext = document.createElement("TD");
	    var ptodotext = document.createElement("p");
	    var t = document.createTextNode(todoTitle);
	    ptodotext.setAttribute('class', 'ptodo');
	    ptodotext.appendChild(t);
	    todoTDtext.appendChild(ptodotext);



	   	var todoTDinput = document.createElement("input");
	   	todoTDinput.setAttribute('type', 'text');
	   	todoTDinput.setAttribute('placeholder', todoTitle);
	   	todoTDinput.setAttribute('class', 'ptodoEdit');
	   	 todoTDtext.appendChild(todoTDinput);
	   	//todoTDinput.classList.add("hideEdit");
	   
	     //todo cell Icon Delete
	    var todoTDiconDelete = document.createElement("TD");
	    todoTDiconDelete.setAttribute('class', 'deleteIcon');
	    todoTDiconDelete.setAttribute('width', '10%');
	    var iconDelete = document.createElement("i");
	    //iconDelete.addEventListener("click", removeTodo);
	    iconDelete.setAttribute('class', 'fa fa-times hide');
	    iconDelete.setAttribute('aria-hidden', 'true');
	    todoTDiconDelete.appendChild(iconDelete);

	    todoTR.appendChild(todoTDiconChecked);
	    todoTR.appendChild(todoTDtext);
	    
	    todoTR.appendChild(todoTDiconDelete);
	    todoTable.appendChild(todoTR);
	   inputTodo.value = "";
 	}


//REMOVE TODO

 function addTodo()
	 {
	 	const ENTER_KEY=13;
		//console.log("EVENT");
	 	if(event.keyCode == ENTER_KEY)
	 	{
	 		console.log("EVENT");
		 	console.log(inputTodo.value);
		 	//Récupère le valeur de mon inputTodo
			let inputValue = inputTodo.value;
			inputValue = inputValue.trim();
			if(inputValue.length!=0)
			{
				xhr.onload = handleAddTodoRequest;
				xhr.open('POST', url);
				xhr.setRequestHeader('Content-Type',
				'application/json; charset=utf-8');
				xhr.send(JSON.stringify({title:inputValue, isactive:1}));
			}
		}		
	}

	function handleAddTodoRequest() 
	{
		if(xhr.status !== 200) 
		{
			alert('HTTP error');
			return;
		}
		let resp = xhr.response;
		let todoAdded = JSON.parse(resp);
		console.log(todoAdded.title);
		// array =>
	    addTodoToHtml(todoAdded);	
	}



	 function removeTodo(event)
	 {
	 	if (event.target.classList.contains("fa-times")) 
  		{
    		let idRowToRemove = event.target.parentNode.parentNode.getAttribute("data-id");
			console.log(idRowToRemove);
			//inputValue = inputValue.trim();
			// if (inputValue.length === 0 ) {
			// 	return;
			// }
			xhr.onload = handleRemoveTodoRequest;
			xhr.open('DELETE', url);
			xhr.setRequestHeader('Content-Type',
				'application/json; charset=utf-8');
			xhr.send(JSON.stringify({idTodo:idRowToRemove}));
  		}	
	}


	



	function allowEditTodo(event)
	{
		if (event.target.classList.contains("ptodo")) 
  		{
  			event.target.parentNode.parentNode.classList.add("Editingmode");
  			event.target.parentNode.parentNode.classList.remove("Readingmode");
  		}
	}
	function disableEditTodo()
	{
		const ENTER_KEY=13;
		//console.log("EVENT");
	 	if(event.keyCode == ENTER_KEY)
	 	{
			if (event.target.classList.contains("ptodoEdit")) 
	  		{
				event.target.parentNode.parentNode.classList.add("Readingmode");
				event.target.parentNode.parentNode.classList.remove("Editingmode");
	  		}
  		}
	}
	function handleRemoveTodoRequest() 
	{
		if(xhr.status !== 200) 
		{
			alert('HTTP error');
			return;
		}
		let resp = xhr.response;
		let todoRemovedId = JSON.parse(resp);
		console.log(todoRemovedId);
		// array =>
	    deleteTodoFromHtml(todoRemovedId);	
	}
 	function deleteTodoFromHtml(todoVal)
 	{
	 	let todoTable = document.querySelector("#todolist table");
	 	console.log(todoVal);
	 	

	 	//todo row.tr
	 	let todoTRToDelete = document.querySelector("[data-id='" + todoVal +"']");
	 	console.log(todoTRToDelete)
	    todoTRToDelete.remove();
 	}
   
	//UPDATE TODO
	 function updateValueTodo(event)
	 {

		const ENTER_KEY=13;
		//console.log("EVENT");
	 	if(event.keyCode == ENTER_KEY)
	 	{
			if (event.target.classList.contains("ptodoEdit")) 
	  		{
				event.target.parentNode.parentNode.classList.add("Readingmode");
				event.target.parentNode.parentNode.classList.remove("Editingmode");


				let ParentptodoToModify = event.target.parentNode.parentNode;
				let ptodoToModify = ParentptodoToModify.querySelector(".ptodo");
				console.log(ParentptodoToModify);
				let inputCheckboxIsActive = ParentptodoToModify.querySelector("input[type='checkbox']");
				
				let valueToUpdate = event.target.value;
				let idRowToChange = event.target.parentNode.parentNode.getAttribute("data-id");
				let isactiveValueToChange = Number(inputCheckboxIsActive.checked) ;

				console.log(valueToUpdate);
				console.log(idRowToChange);
				console.log(isactiveValueToChange);
				//ptodoToModify.innerHTML =valueToUpdate;
				if(valueToUpdate.length!=0)
				{
					updateTodo(idRowToChange,valueToUpdate,isactiveValueToChange);
				}
	  		}
  		}	
	}

	function updateIsActiveTodo(event)
	{
		console.log("CHECKED VALUE ACTIVE");
		if (event.target.classList.contains("inputIsValid")) 
  		{
  			
  			if(event.target.checked)
  			{
  				event.target.checked = false;
  			}
  			else
  			{
  				event.target.checked = true;
  			}
  			let isValidValueChanged = Number(!event.target.checked);
  			let ParentptodoToModify = event.target.parentNode.parentNode;
  			let valueTodo = ParentptodoToModify.querySelector(".ptodo").innerHTML;
  			let idRowToChange = ParentptodoToModify.getAttribute("data-id");
  			updateTodo(idRowToChange,valueTodo,isValidValueChanged);
  		}

	}



	function updateAllIsActiveTodo(event)
	 {
	 	const todoTableLength = todoTable.rows.length;
	 	console.log("mon nombre de ligne" + todoTableLength);
	 	let nbActiveValue = 0;
	 	let nbInactiveValue = 0;
	 	var makeAllActive = false;
	 	for (var i = 0, row; row = todoTable.rows[i]; i++) 
	 	{
	 		let isActiveValue = row.querySelector("input[type='checkbox']").checked;
	 		if(isActiveValue)
	 		{
	 			nbActiveValue = nbActiveValue +1;
	 		}
	 		else
	 		{
	 			nbInactiveValue = nbInactiveValue +1;
	 		}

	 		if((nbActiveValue!=0)&&(nbInactiveValue!=0))
	 		{
	 			console.log("CAS 1 --> CAS 4: ON MET TOUT A TRUE")
	 			makeAllActive = true;
	 			break;
	 		}
		}
		console.log( "NB DE TODO CHECK:" +nbActiveValue);
		console.log("NB DE TODO PAS CHECK:"+nbInactiveValue);
		if(nbActiveValue == todoTableLength)
		{
			console.log("CAS 2: ON MET TOUT A FALSE");
			checkUncheckAll(false);
		}
		else if (nbInactiveValue == todoTableLength)
		{
			console.log("CAS 3: ON MET TOUT A TRUE");
			checkUncheckAll(true);
		}
		else if(makeAllActive)
		{
			console.log("CAS 4: ON EST SORTI DE LA LOOP ON MET TOUT A TRUE");
			checkUncheckAll(true);
		}
	}

	function checkUncheckAll(makeAllCheckOrUncheck)
	{
		console.log("handleUpdateAllTodoRequest");
		xhr.onload = handleUpdateIsActiveRequest;
		xhr.open('PUT', 'http://localhost:9000/todos/updatealltodo/');
		xhr.setRequestHeader('Content-Type',
		'application/json; charset=utf-8');
		xhr.send(JSON.stringify({isactive:Number(makeAllCheckOrUncheck)}));
	}

	function updateTodo(idTodo,valueTodo,isActiveTodo)
	{
		console.log("handleUpdateTodoRequest");
		xhr.onload = handleUpdateTodoRequest;
		xhr.open('PUT', url);
		xhr.setRequestHeader('Content-Type',
		'application/json; charset=utf-8');
		xhr.send(JSON.stringify({idToChange: idTodo, title:valueTodo, isactive:isActiveTodo}));
	}


	function handleUpdateTodoRequest() 
	{
		if(xhr.status !== 200) 
		{
			alert('HTTP error');
			return;
		}
		let resp = xhr.response;
		let todoAdded = JSON.parse(resp);
		console.log(todoAdded);
		// array =>
	    updateTodoToHtml(todoAdded);	
	}

	function handleUpdateIsActiveRequest() 
	{
		if(xhr.status !== 200) 
		{
			alert('HTTP error');
			return;
		}
		let resp = xhr.response;
		let mytodoIsActiveModified = JSON.parse(resp);
		console.log(mytodoIsActiveModified);
		// array =>
	    updateAllIsActiveToHtml(mytodoIsActiveModified);	
	}

	function updateAllIsActiveToHtml(myTodoUpdated)
	{
			for (var i = 0, row; row = todoTable.rows[i]; i++) 
	 		{
	 			row.querySelector("input[type='checkbox']").checked = !!myTodoUpdated;
	 		}
	}

	function updateTodoToHtml(myTodoUpdated)
	{
		let todoTRToDelete = todoTable.querySelector("[data-id='" + myTodoUpdated.idToChange +"']");
		todoTRToDelete.querySelector(".ptodo").innerHTML= myTodoUpdated.title;
		todoTRToDelete.querySelector("input[type='checkbox']").checked= !!myTodoUpdated.isactive;
	}