import { ToDoListDarkTheme } from "../../themes/ToDoListDarkTheme";
import { ToDoListLightTheme } from "../../themes/ToDoListLightTheme";
import { ToDoListPrimaryTheme } from "../../themes/ToDoListPrimaryTheme";

const initialState = {
  themeToDoList: ToDoListLightTheme,
  taskList: [
    { id: "task-1", taskName: "Ăn cơm", done: true },
    { id: "task-2", taskName: "Lau nhà", done: false },
  ],
};

export default (state = initialState, { action }) => {
  switch (action) {
    default:
      return { ...state };
  }
};
