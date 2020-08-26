export default function createState(initialState) {
  let state = initialState;
  let listeners = [];

  const getState = () => state;

  const setState = (nextState) => {
    if (typeof nextState === "function") {
      const prevState = state;
      state = nextState(prevState);
    } else {
      state = nextState;
    }
    listeners.forEach((listener) => listener());
  };
  const subscribe = (listener) => {
    listeners.push(listener);
  };
  return {
    getState,
    setState,
    subscribe,
  };
}
