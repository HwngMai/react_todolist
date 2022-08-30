import { arrThemes } from "../../themes/ThemeManager";
import { add_task, delete_task, done_task } from "../types/ToDoListTypes";
import { change_theme } from "../types/ToDoListTypes";
// Tạo store cho ToDoListAction
const initialState = {
  themeToDoList: arrThemes[0].theme,
  taskList: [
    { id: "task-1", taskName: "Ăn cơm", done: true },
    { id: "task-2", taskName: "Lau nhà", done: false },
  ],
};
//  Xử lí dữ liệu lấy từ action
export default (state = initialState, action) => {
  switch (action.type) {
    // action.type ở đây sẽ là: add_task
    case add_task: {
      console.log("todo", action.newTask);
      // Kiểm tra rỗng
      if (action.newTask.taskName.trim() === "") {
        alert("Nhập vào task");
        return { ...state };
      } else {
        // Kiểm tra trùng
        // Tạo taskListUpdate từ taskList
        let taskListUpdate = [...state.taskList];
        // Tìm index của newTask đó xem tên của newTask đã có trong mảng taskList hay chưa
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
    }
    case change_theme: {
      // Tìm  obj theme dựa vào id và value từ target của action
      let themeChange = arrThemes.find((theme) => theme.id == action.themeId);
      console.log("themeChange: ", themeChange);
      // Nếu tìm thấy gán theme của obj theme đó cho state
      if (themeChange) {
        state.themeToDoList = { ...themeChange.theme };
      }
      return { ...state };
    }
    case done_task: {
      console.log("done_task", action);
      // Tạo tastList mới dựa trên taskList state
      let taskListUpdate = [...state.taskList];
      // Tìm index của task cần update trong mảng taskListUpdate dựa trên taskId từ action truyền về
      let indexUpdate = taskListUpdate.findIndex(
        (task) => task.id == action.taskId
      );
      // Nếu tìm thấy, gán giá trị done của task đó thành false
      if (indexUpdate !== -1) {
        taskListUpdate[indexUpdate].done = false;
      }
      // Truyền lại state, state sẽ tự render lại
      return { ...state, taskList: taskListUpdate };
    }
    case delete_task: {
      console.log("done_task", action);
      // Tạo tastList mới dựa trên taskList state
      let taskListUpdate = [...state.taskList];
      // Tìm index của task cần update trong mảng taskListUpdate dựa trên taskId từ action truyền về
      let indexDelete = taskListUpdate.findIndex(
        (task) => task.id == action.taskIdDelete
      );
      // Nếu tìm thấy, xóa task đó dựa trên indexDelete
      if (indexDelete !== -1) {
        taskListUpdate.splice(indexDelete, 1);
      }
      // Truyền lại state, state sẽ tự render lại
      return { ...state, taskList: taskListUpdate };
    }
    default:
      return { ...state };
  }
};
