import createState from "../core/createState";

const initialState = [];

const { getState, setState, subscribe } = createState(initialState);

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

const task = {
  getState,
  setState,
  subscribe,
  addTask,
  removeTask,
  completeTask,
};
export default task;
