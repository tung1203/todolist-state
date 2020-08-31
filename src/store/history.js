import createState from "../core/createState";
const initialState = { url: "/" };
const { getState, setState, subscribe } = createState(initialState);
const to = (url) => {
  setState({ url });
};
const history = {
  getState,
  setState,
  subscribe,
  to,
};
export default history;
