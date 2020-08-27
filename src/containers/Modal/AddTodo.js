import task from "../../store/task";
import Button from "../../components/Button";
export default class Modal {
  constructor(element) {
    this.element = element;
    this.addTask = this.addTask.bind(this);
  }
  addTask() {
    const id = Date.now();
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    let newTask = {
      id,
      title,
      description,
      from,
      to,
      complete: false,
    };
    task.addTask(newTask);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("from").value = "";
    document.getElementById("to").value = "";
  }
  handleDOM() {
    const addTaskEl = document.querySelector("#btn-add-task");
    addTaskEl && addTaskEl.addEventListener("click", this.addTask);
  }
  render() {
    return `
      <div class="modal-dialog">
        <div class="modal-content p-3">
          <header class="head-form mb-0 mt-4 text-center">
            <h2 id="header-title">Add New Task</h2>
          </header>

          <!-- Modal body -->
          <div class="modal-body">
            <form role="form">
              <div class="form-group row">
                <div class="input-group">
                  <label
                    for="example-datetime-local-input"
                    class="col-2 col-form-label"
                    >Title</label
                  >
                  <input
                    type="text"
                    name="title"
                    id="title"
                    class="col-10 form-control input-sm"
                    placeholder="Title"
                  />
                </div>

                <span class="sp-thongbao" id="tbMaNV"></span>
              </div>

              <div class="form-group row">
                <label
                  for="example-datetime-local-input"
                  class="col-2 col-form-label"
                  >Description</label
                >
                <input
                  type="text"
                  name="description"
                  id="description"
                  class="col-10 form-control input-sm"
                  placeholder="Description"
                />
              </div>
              <div class="form-group row">
                <label
                  for="example-datetime-local-input"
                  class="col-2 col-form-label"
                  >From</label
                >
                <input
                  class="form-control col-10"
                  type="datetime-local"
                  id="from"
                />
              </div>
              <div class="form-group row">
                <label
                  for="example-datetime-local-input"
                  class="col-2 col-form-label"
                  >Due date</label
                >
                <input
                  class="form-control col-10"
                  type="datetime-local"
                  id="to"
                />
              </div>
            </form>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer" id="modal-footer">
          ${Button({
            text: "Add new task",
            color: "btn-success",
            id: "btn-add-task",
            dataDismiss: "modal",
          })}
          ${Button({
            text: "Đóng",
            color: "btn-danger",
            id: "btnDong",
            dataDismiss: "modal",
          })}
          </div>
        </div>
      </div>
    `;
  }
  init() {
    this.element.innerHTML = this.render();
    this.handleDOM();
  }
}
