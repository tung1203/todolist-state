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

    $("#modalEdit").on("show.bs.modal", function (e) {
      var taskId = $(e.relatedTarget).data("id");
      $("#btn-edit-task").attr("data-id", taskId);
      const currentTask = task.getTaskById(taskId);
      const { title, description, from, to } = currentTask[0];
      document.getElementById("title-edit").value = title;
      document.getElementById("description-edit").value = description;
      document.getElementById("from-edit").value = from;
      document.getElementById("to-edit").value = to;
    });
  }
  render() {
    return `
    <div class="todo center">
        <div class="container">
          <div class="card text-center" id="card">
        
          <div class="card-header myCardHeader" id="card-header"></div>

          <div class="card-body" id="card-body"></div>

          <div class="card-footer myCardFooter" id="card-footer"></div>

          </div>
      </div>
    

      `;
  }
  init() {
    this.element.innerHTML = this.render();
    this.handleDom();
  }
}
