export default function StatusIcon({ id, complete }) {
  return `
    <input class="status todoStatus-js ${
      complete ? "complete" : ""
    }" type="checkbox" data-id="${id}">
      `;
}
