import task from "../../store/task";
import Button from "../../components/Button";
export default class Header {
  constructor(element) {
    this.element = element;
    task.subscribe(this.init.bind(this));
  }
  render() {
    return `
        <div class="row">
            <div class="col-md-6">
            <h3 class="text-left text-primary font-weight-bold">
                Todo List
            </h3>
            </div>
            <div class="col-md-6 text-right">
            ${Button({
              text: "Add new task",
              color: "btn-primary",
              id: "btnThem",
              dataToggle: "modal",
              dataTarget: "#myModal",
            })}
            </div>
        </div>
        `;
  }
  init() {
    this.element.innerHTML = this.render();
  }
}
