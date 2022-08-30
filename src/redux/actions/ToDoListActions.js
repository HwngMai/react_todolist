import { add_task } from "../types/ToDoListTypes";
// Tạo store cho action gồm:
// addTaskToAction hay action
// type - loại xử lí ở toDoListReducer
// newTask - dữ liệu để xử lí
export const addTaskToAction = (newTask) => ({
  type: add_task,
  newTask,
  // hay action.type : add_task
});
