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
 
    let temp = [];
    
    temp = retrieveTodo(); 
    
    if(!temp) return;

    // render todo
    temp.forEach((el) => {
        
        let title = el.title;
        let ID = el.id;
        // let complete = el.complete

        // runs the add todo-function
        addToDo(title, ID);
        
    });
}


// add todo to list
function addToDo(data, ID) {
    
    // create div element
    const box = document.createElement('div');
    box.setAttribute('class', 'box');
    box.addEventListener('click', doComplete);
    
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

    let ID = temp.length + 1;
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
    let thisID = target.children[0].dataset.id;
    
    // get localstorage array and filter out the correct listitem
    // let temp = retrieveTodo();
    // let updatedTodo = temp.forEach((el) => {
    //     if(el.id == thisID && el.completed) {
    //         el.completed = false;
    //     } else if(el.id == thisID && !el.completed) {
    //         el.completed = true;      
    //     }
    // });
    // console.log(updateTodo);
    
    // window.localStorage.setItem('todo', JSON.stringify(updatedTodo));
    
    // let thisTodo = temp.filter(el => el.id == thisID);
    // let data = thisTodo[0].title;

    // // remove old item, and set complete status
    // if(thisTodo[0].completed) {
    //     // removeTodo(thisID);
    //     saveToLocal(data, false);
    //     console.log('Saved false');
    // } else {
    //     removeTodo(thisID);
    //     saveToLocal(data, true);
    //     // console.log('Saved true');
    // }

}