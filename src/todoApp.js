const form = document.getElementById('inputTodoForm');
const todoInput = document.getElementById('todoInput');
const deleteBtn = document.querySelectorAll('.delete');
const todo = document.getElementById('todoUl');


// render todo
todoArr.forEach((element, index) => {
    // runs the add todo-function
    addToDo(todoArr[index].title);
    
});

// add todo
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get the value
    let todoVal = document.getElementById('todoInput').value;
    
    // exit if empty
    if(!todoVal) return;
    
    // adds todo to screen
    addToDo(todoVal);
    
    // reset input
    document.getElementById('todoInput').value = "";
});


// add todo to list
function addToDo(data) {
    
    // create div element
    const box = document.createElement('div');
    box.setAttribute('class', 'box');
    
    // create li element and adds unique id 
    const listItem = document.createElement('li');
    const todoId = todoArr.length + 1;
    listItem.setAttribute('data-id', todoId);
    
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
        const data = Number(listItem.dataset.id);
        
        removeTodo(data, target);
    });
    
    // add list item to ul and display the data to the screen
    todo.appendChild(box).appendChild(listItem);
    listItem.innerHTML = data; 
    listItem.appendChild(deleteBtnLink);
    
    //TODO: lägg till due och skapelsedatum
    todoArr.push({
        id: todoId,
        title: data,
        due: null,
        created: null,
    });

    window.localStorage.setItem('todo', JSON.stringify(todoArr));
}
function removeTodo(data, target) {
    
    // removes li from screen
    target.style.display = 'none';
    
    // console.log('arr', todoArr);
    console.log('data', data);

    // filter the right object from the arr to remove
    let toRemove = todoArr.map(el => el.id).indexOf(data);
    
    console.log('index to remove', toRemove);
    
    todoArr.slice(toRemove, 1);
    
    console.log(todoArr);
    
    
    
}
