import StatusIcon from "./StatusIcon";
import DeleteIcon from "./DeleteIcon";

export default function Task({ id, title, description, from, to, complete }) {
  return `
    <div class="task ${complete ? "complete" : ""}" data-id="${id}">
    ${StatusIcon({ id, complete })}
      <div class="task__content">
          <label class="task__title" id="js-task-title">${title}</label>
          <p class="task__des" id="js-task-des">${description}</p>
      </div>
      <div class="task__date">
          <p class="task__from" id="js-task-from">${from}</p>
          <p class="task__to" id="js-task-to">${to}</p>
      </div>
      ${DeleteIcon({ id })}
    </div>
    `;
}

{
  /* <input class="status ${
  complete ? "complete" : ""
} todoStatus-js" type="checkbox" data-id="${id}" /> */
}
