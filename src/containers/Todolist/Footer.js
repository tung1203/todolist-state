export default class Footer {
  constructor(element) {
    this.element = element;
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