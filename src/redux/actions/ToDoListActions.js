import {
  add_task,
  delete_task,
  done_task,
  edit_task,
  update_task,
} from "../types/ToDoListTypes";
// Tạo store cho action gồm:
// addTaskToAction hay action
// type - loại xử lí ở toDoListReducer
// newTask - dữ liệu để xử lí
export const addTaskToAction = (newTask) => ({
  type: add_task,
  newTask,
  // hay action.type : add_task
});
export const doneTaskAction = (taskId) => ({
  type: done_task,
  taskId,
  // hay action.type : done_task
});
export const deleteTaskAction = (taskIdDelete) => ({
  type: delete_task,
  taskIdDelete,
  // hay action.type : delete_task
});
export const editTaskAction = (taskEdit) => ({
  type: edit_task,
  taskEdit,
  // hay action.type : edit_task
});
export const updateTaskToAction = (taskNameUpdate) => ({
  type: update_task,
  taskNameUpdate,
  // hay action.type : edit_task
});
