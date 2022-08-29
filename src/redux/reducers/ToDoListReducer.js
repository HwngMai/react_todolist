import { ToDoListDarkTheme } from "../../themes/ToDoListDarkTheme";
import { ToDoListLightTheme } from "../../themes/ToDoListLightTheme";
import { ToDoListPrimaryTheme } from "../../themes/ToDoListPrimaryTheme";
import { add_task } from "../types/ToDoListTypes";

const initialState = {
  themeToDoList: ToDoListLightTheme,
  taskList: [
    { id: "task-1", taskName: "Ăn cơm", done: true },
    { id: "task-2", taskName: "Lau nhà", done: false },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case add_task: {
      console.log("todo", action.newTask);
      // Kiểm tra rỗng
      if (action.newTask.taskName.trim() === "") {
        alert("Nhập vào task");
      }
      // Kiểm tra trùng
      // tạo taskListUpdate từ taskList
      let taskListUpdate = [...state.taskList];
      //tìm index của newTask đó xem tên của newTask đã có trong mảng taskList hay chưa
      let index = taskListUpdate.findIndex(
        (task) => task.taskName === action.newTask.taskName
      );
      // Nếu tìm thấy
      if (index !== -1) {
        alert("Task đã tồn tại");
        return { ...state };
      }
      // Nếu ko tìm thấy tức chưa có
      // Đẩy newTask vào tastListUpdate
      // Gán taskList = tastListUpdate
      taskListUpdate.push(action.newTask);
      state.taskList = [...taskListUpdate];
      return { ...state };
    }
    default:
      return { ...state };
  }
};
