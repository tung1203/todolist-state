import Header from "./Header";
import TaskList from "./TaskList";
import Footer from "./Footer";
import task from "../../store/task";

export default class Counter {
  constructor(element) {
    this.element = element;

    this.todoListHeaderInstance = null;
    this.todoListTaskListInstance = null;
    this.todoLisFooterInstance = null;
  }
  handleDom() {
    const todoListHeader = document.getElementById("card-header");
    const todoListTaskList = document.getElementById("card-body");
    const todoListFooter = document.getElementById("card-footer");

    if (!this.todoListHeaderInstance) {
      this.todoListHeaderInstance = new Header(todoListHeader);
    }
    if (!this.todoListTaskListInstance) {
      this.todoListTaskListInstance = new TaskList(todoListTaskList);
    }
    if (!this.todoLisFooterInstance) {
      this.todoLisFooterInstance = new Footer(todoListFooter);
    }

    this.todoListHeaderInstance.init();
    this.todoListTaskListInstance.init();
    this.todoLisFooterInstance.init();
  }
  render() {
    return `
    <div class="card-header myCardHeader" id="card-header"></div>

    <div class="card-body" id="card-body"></div>

    <div class="card-footer myCardFooter" id="card-footer"></div>

      `;
  }
  init() {
    this.element.innerHTML = this.render();
    this.handleDom();
  }
}
