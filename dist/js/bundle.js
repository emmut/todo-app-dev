/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./mystyles.scss */ "./src/mystyles.scss");
__webpack_require__(/*! ./todoApp.js */ "./src/todoApp.js");


/***/ }),

/***/ "./src/mystyles.scss":
/*!***************************!*\
  !*** ./src/mystyles.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/todoApp.js":
/*!************************!*\
  !*** ./src/todoApp.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
    let accept = confirm('Are you sure?');

    if (!accept) return;
    // clear all todos from storeage
    window.localStorage.clear();
    // sets up new empty array 
    window.localStorage.setItem('todo', JSON.stringify([]));
    
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
    let testArr = window.localStorage.getItem('todo');
    // add object if completely empty
    if( testArr == null || testArr == undefined ) {
        // sets up the array if no todos exists
        window.localStorage.setItem('todo', JSON.stringify([{}]));
    }

    let temp = retrieveTodo(); 
    if(!temp) return;

    // render todo
    temp.forEach((el) => {
        
        let title = el.title;
        let ID = el.id;
        let completed = el.completed
        
        if(
            title       == undefined ||
            ID          == undefined ||
            completed   == undefined 
            ) return;

        // runs the add todo-function
        addToDo(title, ID, completed);
        
    });
}


// display todo to the screen
function addToDo(data, ID, completed) {
    
    // create div element
    const box = document.createElement('div');
    box.setAttribute('class', 'box');
    box.addEventListener('click', doComplete);
    if(completed) {
        box.classList.toggle('completed');
    }
    
    // create li and span element and adds unique id 
    const listItem = document.createElement('li');
    listItem.setAttribute('data-id', ID);
    const span = document.createElement('span');
    span.setAttribute('class', 'lt');
    const fa = document.createElement('i');
    fa.setAttribute('class', 'fas fa-check');

    let temp = retrieveTodo();
    if(!temp) return;

    // create p element with date
    const textElement = document.createElement('p');
    textElement.setAttribute('class', 'date')
    const dateText = document.createTextNode('Created: ' + temp[ID].created);
    textElement.appendChild(dateText);

    
    // create deleteBtn
    const deleteBtnLink = document.createElement('a');
    deleteBtnLink.setAttribute('class', 'delete is-small');
    
    // adds delete function to new element
    deleteBtnLink.addEventListener('click', (e) => {
        // get list item data and elemets
        const listItem = e.target.parentElement;
        // .box to remove
        const target = listItem.parentElement;
        // listitem ID
        const ID = Number(listItem.dataset.id);
        
        removeTodo(ID, target);
    });
    
    // add list item to ul and display the data to the screen
    todo.insertBefore(box, todo.childNodes[0]).appendChild(listItem);
    listItem.appendChild(span);
    listItem.insertBefore(fa, span) 
    span.innerHTML = data; 
    listItem.appendChild(deleteBtnLink);
    listItem.appendChild(textElement);

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
    today = yyyy + '/' + mm + '/' + dd;

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
        created: today,
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
        if (index === thisID) {
            if(array[index].completed) {
                array[index].completed = false;
            } else {
                array[index].completed = true;
            }
        }
    });
    
    window.localStorage.setItem('todo', JSON.stringify(temp));
    
}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map