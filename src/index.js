import TodoList from "./containers/Todolist";
import History from "./containers/History";
import AddTodo from "./containers/Modal/AddTodo";
import EditTodo from "./containers/Modal/EditTodo";
import history from "./store/history";
class App {
  constructor(element) {
    this.element = element;
    this.todoListInstance = null;
    this.historyInstance = null;
    this.addTodoInstance = null;
    this.editTodoInstance = null;
  }
  handleDom() {
    const contentElement = document.getElementById("content");
    const addTodoElement = document.getElementById("myModal");
    const editTodoElement = document.getElementById("modalEdit");

    if (!this.historyInstance) {
      this.historyInstance = new History(contentElement);
    }
    if (!this.todoListInstance) {
      this.todoListInstance = new TodoList(contentElement);
    }
    if (!this.addTodoInstance) {
      this.addTodoInstance = new AddTodo(addTodoElement);
    }
    if (!this.editTodoInstance) {
      this.editTodoInstance = new EditTodo(editTodoElement);
    }

    switch (history.getState().url) {
      case "/":
        this.todoListInstance.init();
        this.addTodoInstance.init();
        this.editTodoInstance.init();
        break;
      case "/history":
        this.historyInstance.init();
        break;
      default:
        this.todoListInstance.init();
        this.addTodoInstance.init();
        this.editTodoInstance.init();
        break;
    }
  }

  render() {
    return `
    <main class="content" id="content">
     
    </main>
    <div class="modal fade todo__modal" id="myModal"></div>
    <div class="modal fade todo__modal" id="modalEdit"></div>
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
