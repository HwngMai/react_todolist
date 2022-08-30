import { arrThemes } from "../../themes/ThemeManager";
import { add_task } from "../types/ToDoListTypes";
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
    case "change_theme": {
      // tìm  obj theme dựa vào id và value từ target của action
      let themeChange = arrThemes.find((theme) => theme.id == action.themeId);
      console.log("themeChange: ", themeChange);
      // Nếu tìm thấy gán theme của obj theme đó cho state
      if (themeChange) {
        state.themeToDoList = { ...themeChange.theme };
      }
      return { ...state };
    }
    default:
      return { ...state };
  }
};
