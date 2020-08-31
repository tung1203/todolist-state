export default class History {
  constructor(element) {
    this.element = element;
  }
  handleDom() {}
  render() {
    return `
    <div class="history center">
       history
      </div>
      `;
  }
  init() {
    this.element.innerHTML = this.render();
    this.handleDom();
  }
}
