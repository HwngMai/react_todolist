import { ToDoListDarkTheme } from "../../themes/ToDoListDarkTheme";

const initialState = {
  themeToDoList: ToDoListDarkTheme,
  taskList: [],
};

export default (state = initialState, { action }) => {
  switch (action) {
    default:
      return { ...state };
  }
};
