
import task from "../../store/task";
export default class Footer {
  constructor(element) {
    this.element = element;
    task.subscribe(this.init.bind(this));
  }
  render() {
    return `
    <div>
     
      </div>
      `;
  }
  init() {
    this.element.innerHTML = this.render();
  }
}
{/* <button
class="btn btn-primary"
id="btnHistory"
data-toggle="modal"
data-target="#history"
>
History
</button> */}