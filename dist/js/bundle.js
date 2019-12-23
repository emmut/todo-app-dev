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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map