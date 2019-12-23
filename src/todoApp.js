const form = document.getElementById('inputTodoForm');
const todoInput = document.getElementById('todoInput');
const deleteBtn = document.querySelectorAll('.delete');
const deleteAllBtn = document.getElementById('deleteAll');
const todo = document.getElementById('todoUl');
const todoItems = todo.childNodes;

window.onload = renderTodo();

// events
// add todo
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get the value
    let todoVal = document.getElementById('todoInput').value;
    
    // exit if empty
    if(!todoVal) return;

    // save to local storeage
    let ID  = saveToLocal(todoVal);
    
    // adds todo to screen
    addToDo(todoVal, ID);
    
    // reset input
    document.getElementById('todoInput').value = "";
});

deleteAllBtn.addEventListener('click', () =>  {
    window.localStorage.clear();
    
    todoItems.forEach((el) => {
        el.style.display = 'none';
    });

});

todoItems.forEach((el) => {
    el.addEventListener('click', doComplete);
});

function retrieveTodo() {
    let temp = window.localStorage.getItem('todo');

    if(!temp) return;
    
    return JSON.parse(temp);
}

function renderTodo() {

    // add object if completely empty
    if(!window.localStorage) window.localStorage.setItem('todo', JSON.stringify([{}]));

    let temp = retrieveTodo(); 

    // render todo
    temp.forEach((el) => {
        
        let title = el.title;
        let ID = el.id;
        let completed = el.completed
        // let complete = el.complete

        // runs the add todo-function
        addToDo(title, ID, completed);
        
    });
}


// add todo to list
function addToDo(data, ID, completed) {
    
    // create div element
    const box = document.createElement('div');
    box.setAttribute('class', 'box');
    box.addEventListener('click', doComplete);
    if(completed) {
        box.classList.toggle('completed');
    }
    
    // create li element and adds unique id 
    const listItem = document.createElement('li');
    listItem.setAttribute('data-id', ID);

    
    // create deleteBtn
    const deleteBtnLink = document.createElement('a');
    deleteBtnLink.setAttribute('class', 'delete');
    
    // adds delete function to new element
    deleteBtnLink.addEventListener('click', (e) => {
        // get list item data and elemets
        const listItem = e.target.parentElement;
        // .box to remove
        const target = listItem.parentElement;
        // listitem data
        const ID = Number(listItem.dataset.id);
        
        removeTodo(ID, target);
    });
    
    // add list item to ul and display the data to the screen
    todo.appendChild(box).appendChild(listItem);
    listItem.innerHTML = data; 
    listItem.appendChild(deleteBtnLink);

}
function removeTodo(ID, target) {
    
    // removes li from screen
    if(target) target.style.display = 'none';

    // filter the right object from the arr to remove
    let temp = retrieveTodo();
    if(!temp) return;

    // filters out the right ID and then updates storage
    let trimmed = temp.filter(el => el.id != ID);
    window.localStorage.setItem('todo', JSON.stringify(trimmed));
        
}

function saveToLocal(data, done = false ) {

    // get current date
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    // format date
    today = dd + '/' + mm + '/' + yyyy;

    // get todo array from storage
    let temp = retrieveTodo();

    if(!temp) {
        temp = [];
    }

    let ID = temp.length;
    // TODO: lägg till due och skapelsedatum
    // add data to temporary object
    temp.push({
        id: ID,
        title: data,
        due: null,
        modified: today,
        created: null,
        completed: done,
    });
    
    // saves temporart object to local storage
    window.localStorage.setItem('todo', JSON.stringify(temp));

    return ID
}

// adds complete class and saves to storage
function doComplete(e) {
    let target = e.currentTarget;
    // toggle complete class
    target.classList.toggle('completed');

    //  get id of current listitem
    let thisID = Number(target.children[0].dataset.id);
    
    // get localstorage array and filter out the correct listitem
    let temp = retrieveTodo();
    
    temp.forEach((el, index, array) => {
        // console.log(el.completed);
        // console.log(array[index].completed);
        
        if (index === thisID) {
            if(array[index].completed) {
                array[index].completed = false;
                console.log(array[index].completed);
            } else {
                array[index].completed = true;
                console.log(array[index].completed);
            }
            
        }
        
    });
    
    window.localStorage.setItem('todo', JSON.stringify(temp));
    
}