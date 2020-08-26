import Task from "../../components/Task";
import taskStore from "../../store/task";
export default class Modal {
  constructor(element) {
    this.element = element;
  }
  handleDOM() {
    const btnDelTaskEls = document.querySelectorAll(".task__delete");
    btnDelTaskEls.forEach((element) =>
      element.addEventListener("click", () => {
        taskStore.removeTask(element.getAttribute("data-id"));
      })
    );
    const btnStatusTaskEls = document.querySelectorAll(".task__status");
    btnStatusTaskEls.forEach((element) =>
      element.addEventListener("click", () => {
        taskStore.completeTask(element.getAttribute("data-id"));
      })
    );
  }
  render() {
    const tasklist = taskStore.getState();
    return `
      <div class="card-body">
        <div class="task-list" id="task-list">
             ${tasklist && tasklist.map((task) => Task(task))}
        </div>
    </div>
          `;
  }
  init() {
    this.element.innerHTML = this.render();
    this.handleDOM();
  }
}
