import createState from "../core/createState";

const initialState = [
  {
    id: 1598588336036,
    title: "12",
    description: "34",
    from: "2020-08-07T11:18",
    to: "2020-08-15T11:18",
    complete: false,
  },
  {
    id: 1598588344144,
    title: "5",
    description: "3",
    from: "2020-08-05T11:19",
    to: "2020-08-14T11:19",
    complete: false,
  },
  {
    id: 1598588344145,
    title: "5",
    description: "3",
    from: "2020-08-05T11:19",
    to: "2020-08-29T18:19",
    complete: false,
  },
];

const { getState, setState, subscribe } = createState(initialState);

const getTaskById = (id) => {
  return getState().filter((task) => task.id === parseInt(id));
};
const addTask = (task) => {
  setState((prevState) => [...prevState, { ...task }]);
};
const removeTask = (id) => {
  setState((prevState) => prevState.filter((task) => task.id !== parseInt(id)));
};
const completeTask = (id) => {
  setState((prevState) =>
    prevState.map((task) => {
      if (task.id === parseInt(id)) {
        task.complete = task.complete ? false : true;
      }
      return task;
    })
  );
};
const editTask = (newTask) => {
  setState((prevState) =>
    prevState.map((task) => {
      if (task.id !== parseInt(newTask.id)) {
        return task;
      }
      return {
        ...task,
        ...newTask,
      };
    })
  );
};

const task = {
  getState,
  setState,
  subscribe,
  getTaskById,
  addTask,
  removeTask,
  completeTask,
  editTask,
};
export default task;
