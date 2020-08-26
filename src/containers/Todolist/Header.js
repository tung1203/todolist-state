export default class Header {
  constructor(element) {
    this.element = element;
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
            <button
                class="btn btn-primary"
                id="btnThem"
                data-toggle="modal"
                data-target="#myModal"
            >
                Add new task
            </button>
            </div>
        </div>
        `;
  }
  init() {
    this.element.innerHTML = this.render();
  }
}
