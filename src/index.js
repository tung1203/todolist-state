import task from "./store/task";
import TodoList from "./containers/Todolist";
import AddTodo from "./containers/Modal/AddTodo";

class App {
  constructor(element) {
    this.element = element;
    this.todoListInstance = null;
    this.addTodoInstance = null;

    // task.subscribe(this.init.bind(this));
  }
  handleDom() {
    const todoListElement = document.getElementById("card");
    const addTodoElement = document.getElementById("myModal");

    // this.todoListInstance = new TodoList(todoListElement);
    // this.addTodoInstance = new AddTodo(addTodoElement);

    if (!this.todoListInstance) {
      this.todoListInstance = new TodoList(todoListElement);
    }
    if (!this.addTodoInstance) {
      this.addTodoInstance = new AddTodo(addTodoElement);
    }
    this.todoListInstance.init();
    this.addTodoInstance.init();
  }

  render() {
    return `
    <main class="content">
      <div class="todo center">
        <div class="container">
          <div class="card text-center" id="card">
        
          </div>
      </div>
    </div>
    <div class="modal fade todo__modal" id="myModal"></div>
    `;
  }
  init() {
    this.element.innerHTML = this.render();
    this.handleDom();
  }
}

const appElement = document.getElementById("root");
const appInstance = new App(appElement);
appInstance.init();
