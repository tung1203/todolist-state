import task from "../../store/task";
import Button from "../../components/Button";
export default class EditTodo {
  constructor(element) {
    this.element = element;
    this.editTask = this.editTask.bind(this);
  }
  editTask(id) {
    id = parseInt(id);
    let title = document.getElementById("title-edit").value;
    let description = document.getElementById("description-edit").value;
    let from = document.getElementById("from-edit").value;
    let to = document.getElementById("to-edit").value;
    let newTask = {
      id,
      title,
      description,
      from,
      to,
      complete: false,
    };

    task.editTask(newTask);

    document.getElementById("title-edit").value = "";
    document.getElementById("description-edit").value = "";
    document.getElementById("from-edit").value = "";
    document.getElementById("to-edit").value = "";
  }
  handleDOM() {
    const addTaskEl = document.querySelector("#btn-edit-task");
    const that = this;
    addTaskEl &&
      addTaskEl.addEventListener("click", function (e) {
        that.editTask(e.target.getAttribute("data-id"));
      });
  }
  render() {
    return `
      <div class="modal-dialog">
        <div class="modal-content p-3">
          <header class="head-form mb-0 mt-4 text-center">
            <h2 id="header-title">Edit Task</h2>
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
                    id="title-edit"
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
                  id="description-edit"
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
                  id="from-edit"
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
                  id="to-edit"
                />
              </div>
            </form>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer" id="modal-footer">
          ${Button({
            text: "Đóng",
            color: "btn-secondary",
            id: "btnDong",
            dataDismiss: "modal",
          })}
          ${Button({
            text: "Edit",
            color: "btn-success",
            id: "btn-edit-task",
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
