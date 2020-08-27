export default function Button({
  text,
  color,
  id,
  dataToggle,
  dataTarget,
  dataDismiss,
}) {
  return `
    <button
        class="btn ${color}"
        id=${id}
        data-toggle=${dataToggle}
        data-target=${dataTarget}
        data-dismiss=${dataDismiss}
        >
        ${text}
    </button>
      `;
}
