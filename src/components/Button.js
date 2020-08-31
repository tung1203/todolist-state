export default function Button({
  text,
  color,
  id,
  dataToggle,
  dataTarget,
  dataDismiss,
  dataId,
}) {
  return `
    <button
        class="btn ${color}"
        id=${id}
        data-toggle=${dataToggle}
        data-target=${dataTarget}
        data-dismiss=${dataDismiss}
        data-id="${dataId}"
        >
        ${text}
    </button>
      `;
}
