import StatusIcon from "./StatusIcon";
import DeleteIcon from "./DeleteIcon";
import Button from "./Button";
import dueDate from "../utils/dueDate";

export default function Task({ id, title, description, from, to, complete }) {
  let color = "";
  if (complete) {
    color = "complete";
  } else {
    color = dueDate(to);
  }
  return `
    <div class="task ${color}" data-id="${id}">
    ${StatusIcon({ id, complete })}
      <div class="task__content">
          <label class="task__title" id="js-task-title">${title}</label>
          <p class="task__des" id="js-task-des">${description}</p>
      </div>
      <div class="task__date">
          <p class="task__from" id="js-task-from">${from}</p>
          <p class="task__to" id="js-task-to">${to}</p>
      </div>
      ${Button({
        text: "Edit",
        color: "text-info",
        id: "modalEditBtn",
        dataToggle: "modal",
        dataTarget: "#modalEdit",
        dataId: id,
      })}
      ${DeleteIcon({ id })}
    </div>
    `;
}
