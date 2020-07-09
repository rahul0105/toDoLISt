// selector
const toDoinput= document.querySelector("#title"); 
const toDobutton= document.querySelector("#addi"); 
const toDolist= document.querySelector(".todo-list"); 
const filterOption= document.querySelector(".filter-todo");

//event lisner
  // for adding
    toDobutton.addEventListener('click',addTodo);
  // for deleting
    toDolist.addEventListener('click', deleteCheck);
  // for click on option
  filterOption.addEventListener('click',filterTodo) ;
  // for loding prev data
  document.addEventListener("DOMContentLoaded",getTodo);

//function
function addTodo(event)
{
    //prevent form from submitting
     event.preventDefault();
     //create to do div after ul tag
     const todoDiv= document.createElement('div');
     todoDiv.classList.add('todo');
     //creat li after div(for title)
     const todoLi= document.createElement('li');
     todoLi.innerText=toDoinput.value;
     todoLi.classList.add('todo-item');
     todoDiv.appendChild(todoLi);
     //Add todo to localstorage
     removeLocalStorage(toDoinput.value);
     //check button
     const completedButton = document.createElement('button');
     completedButton.innerHTML='<i class="fas fa-check-square"></i>';
     completedButton.classList.add('completed-btn');
     todoDiv.appendChild(completedButton);
     //delete button
     const deleteButton= document.createElement('button');
     deleteButton.innerHTML='<i class="fas fa-trash"></i>'; 
     deleteButton.classList.add('trash-btn'); 
     todoDiv.appendChild(deleteButton);
     //appent to ul
     toDolist.appendChild(todoDiv);
     //clear Todo input(title)
     toDoinput.value="";
}

function deleteCheck(e){
  const item=e.target;//for what we are clicking got store in item
  //Delete todo
 if(item.classList[0]==='trash-btn'){
     //teking parent elemnt to delete here parent element is div of class todo
     const pa=item.parentElement;
     pa.classList.add('fall');//adding class to do animation when delting
     //we cant use remove fun becaue animation will not work
     //remove local storage
     removeLocalStorage(pa);
     //we can add event lister of type transitionend it will remove after transtional
       pa.addEventListener('transitionend', function(){
         pa.remove();
       }) ;
}
 //Check mark
 if(item.classList[0]==='completed-btn'){
     const pa= item.parentElement;
     pa.classList.toggle('completed');
 }
}
//function for option 
function filterTodo(e){
    const todos= toDolist.childNodes;
    todos.forEach(function(todo){
     switch (e.target.value){
         case "all": todo.style.display='flex';
             break;
         case "completed":    if(todo.classList.contains("completed")){
             todo.style.display="flex";
         }
         else{
             todo.style.display="none";
         }
         break;
         case "uncompleted": if(!todo.classList.contains("completed")){
            todo.style.display="flex";
         }
         else{
            todo.style.display="none";
        }
        break;
     }
    });
}

//function for savelocal
//todo is class of div we created
function saveLocal(todo){
//check --hey do i already have things in there?
let todos;
if(localStorage.getItem('todos')===null){
   todos=[]; 
}else{
    todos=JSON.parse(localStorage.getItem('todos'));
}
todos.push(todo);
localStorage.setItem("todos",JSON.stringify(todos));
}
//function for updating todos
function getTodo(todo){
    //check --hey do i already have things in there?
let todos;
if(localStorage.getItem('todos')===null){
   todos=[]; 
}else{
    todos=JSON.parse(localStorage.getItem('todos'));
}
todos.forEach(function(todo){
  //create to do div after ul tag
  const todoDiv= document.createElement('div');
  todoDiv.classList.add('todo');
  //creat li after div(for title)
  const todoLi= document.createElement('li');
  todoLi.innerText=todo; //from local storage
  todoLi.classList.add('todo-item');
  todoDiv.appendChild(todoLi);
  //check button
  const completedButton = document.createElement('button');
  completedButton.innerHTML='<i class="fas fa-check-square"></i>';
  completedButton.classList.add('completed-btn');
  todoDiv.appendChild(completedButton);
  //delete button
  const deleteButton= document.createElement('button');
  deleteButton.innerHTML='<i class="fas fa-trash"></i>'; 
  deleteButton.classList.add('trash-btn'); 
  todoDiv.appendChild(deleteButton);
  //appent to ul
  toDolist.appendChild(todoDiv);
});
}

//function to deleted todo
function removeLocalStorage(todo){
 //check --hey do i already have things in there?
 let todos;
 if(localStorage.getItem('todos')===null){
    todos=[]; 
 }else{
     todos=JSON.parse(localStorage.getItem('todos'));
 }
const todoIndex= todo.children[0].innerText;//going to text of input
todos.splice(todos.indexOf(todoIndex),1);
localStorage.setItem('todos',JSON.stringify(todos));
}