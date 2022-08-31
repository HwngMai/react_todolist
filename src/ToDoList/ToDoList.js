import React, { Component } from "react";
import { Container } from "../components/Container";
import { ThemeProvider } from "styled-components";
import { Dropdown } from "../components/Dropdown";
import { Heading1, Heading2, Heading3 } from "../components/Heading";
import { Label, TextField, Input } from "../components/TextField";
import { Button } from "../components/Button";
import { Table, Tr, Td, Th, Thead, Tbody } from "../components/Table";
//redux
import { connect } from "react-redux";
import {
  addTaskToAction,
  doneTaskAction,
  deleteTaskAction,
  editTaskAction,
  updateTaskToAction,
} from "../redux/actions/ToDoListActions";
//Theme
import { arrThemes } from "../themes/ThemeManager";
import { change_theme } from "../redux/types/ToDoListTypes";
class ToDoList extends Component {
  // Tạo state
  state = {
    taskName: "",
    disabledUpdate: true,
    disabledAdd: false,
  };
  // Hàm rendertasktodo()
  // filter() từng task nếu task.done == true thì cho vào mảng mới
  // map() mảng mới đó rồi return các giá trị Tr theo mẫu
  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => task.done == true)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th className='text-left'> {task.taskName} </Th>
            <Th className='text-right'>
              {" "}
              <Button
                // Hàm editTask
                onClick={() => {
                  // enable nút update
                  // disable nút add
                  this.setState({
                    disabledUpdate: false,
                    disabledAdd: true,
                  });
                  this.props.dispatch(editTaskAction(task));
                }}
                className='ml-2'>
                <i className='fa fa-edit'></i>
              </Button>{" "}
              <Button
                // Hàm chuyển task sang taskDone
                onClick={() => {
                  this.props.dispatch(doneTaskAction(task.id));
                }}
                className='ml-2'>
                <i className='fa fa-check'></i>
              </Button>{" "}
              <Button
                // Hàm xóa task
                onClick={() => {
                  this.props.dispatch(deleteTaskAction(task.id));
                }}
                className='ml-2'>
                <i className='fa fa-trash'></i>
              </Button>{" "}
            </Th>
          </Tr>
        );
      });
  };
  // Hàm rendertaskdone()
  // filter() từng task nếu task.done == false thì cho vào mảng mới
  // map() mảng mới đó rồi return các giá trị Tr theo mẫu
  renderTaskDone = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th className='text-left'> {task.taskName} </Th>
            <Th className='text-right'>
              <Button
                // Hàm xóa task
                onClick={() => {
                  this.props.dispatch(deleteTaskAction(task.id));
                }}
                className='ml-2'>
                <i className='fa fa-trash'></i>
              </Button>{" "}
            </Th>
          </Tr>
        );
      });
  };
  // Hàm renderTheme()
  // Mỗi theme trong mảng arrThemes => render ra một option
  renderTheme = () => {
    return arrThemes.map((theme, index) => {
      return (
        <option key={index} value={theme.id}>
          {theme.name}
        </option>
      );
    });
  };
  //** Để editTask */
  // Cách 1: Life cycle nhận vào props mới thực thi trước render
  UNSAFE_componentWillReceiveProps(newProps) {
    this.setState({
      // lấy giá trị taskName của taskEdit gán vào taskName của state
      taskName: newProps.taskEdit.taskName,
    });
  }
  // Cách 2: Lifecycle tĩnh không truy suất được ở trỏ this
  // static getDerivedStateFromProps(newProps, currentState) {
  //   // newProps: là props mới, props cũ là this.props
  //   // currentState: ứng với state hiện tại this.state
  //   // hoặc trả về state mới
  //   let newState = { ...currentState, taskName: newProps.taskEdit.taskName };
  //   return newState;
  // }
  render() {
    return (
      <ThemeProvider theme={this.props.themeToDoList}>
        <div>
          {" "}
          <Container className='w-75'>
            <Dropdown
              // Lấy dữ liệu theme khi thay đổi
              onChange={(e) => {
                let { value } = e.target;
                // Dispatch value lên reducer
                this.props.dispatch({
                  type: change_theme,
                  themeId: value,
                });
              }}>
              {/* gọi hàm render theme */}
              {this.renderTheme()}
            </Dropdown>
            <Heading3 className='text-left mt-3'>TO DO LIST</Heading3>
            <TextField
              // Gán giá trị là taskName của state
              // taskName có thể gán lại bằng taskEdit.taskName khi editTask line:107
              value={this.state.taskName}
              // lấy dữ liệu khi có thay đổi tại Textfield vào state
              onChange={(e) => {
                this.setState(
                  {
                    taskName: e.target.value,
                  },
                  () => {
                    console.log("taskName: ", this.state.taskName);
                  }
                );
              }}
              name='taskName'
              label='Task name  : '></TextField>
            {/* Kiểm tra state để render button disabled ? */}
            {this.state.disabledAdd ? (
              <Button disabled className='ml-2'>
                <i className='fa fa-plus'></i> Add task
              </Button>
            ) : (
              <Button
                onClick={() => {
                  // lấy thông tin người dùng nhập vào từ input
                  let { taskName } = this.state;
                  // tạo object newTask
                  let newTask = {
                    id: Date.now(),
                    taskName: taskName,
                    done: true,
                  };
                  console.log("newTask: ", newTask);
                  // đưa newTask vào taskList ở store action bằng phương thức dispatch
                  this.props.dispatch(addTaskToAction(newTask));
                }}
                className='ml-2'>
                <i className='fa fa-plus'></i> Add task
              </Button>
            )}
            {this.state.disabledUpdate ? (
              // nếu disableUpdate: true => disable
              <Button disabled className='ml-2'>
                <i className='fa fa-upload'></i> Update task
              </Button>
            ) : (
              // nếu disableUpdate: false => enable
              <Button
                onClick={() => {
                  // enable nút add
                  // disable nút update
                  this.setState({
                    disabledUpdate: true,
                    disabledAdd: false,
                  });
                  // đưa taskName cần update vào taskName ở store action bằng phương thức dispatch
                  this.props.dispatch(updateTaskToAction(this.state.taskName));
                }}
                className='ml-2'>
                <i className='fa fa-upload'></i> Update task
              </Button>
            )}
            <hr />
            <Heading3 className='text-left text-warning '>TASK TO DO</Heading3>
            <Table>
              <Thead>{this.renderTaskToDo()}</Thead>
            </Table>
            <hr />
            <Heading3 className='text-left text-success'>
              TASK COMPLETE
            </Heading3>
            <Table>
              <Thead>{this.renderTaskDone()}</Thead>
            </Table>
          </Container>
        </div>
      </ThemeProvider>
    );
  }
  // LifeCycle trả về props cũ và state cũ của components trước khi render nhưng chạy sau khi render
  componentDidUpdate(prevProps, PrevState) {
    // So sánh props trước đó tức taskEdit trước mà khác taskEdit sau:
    if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
      this.setState({
        taskName: this.props.taskEdit.taskName,
      });
    }
  }
}

const mapStatetoProps = (state) => {
  return {
    themeToDoList: state.ToDoListReducer.themeToDoList,
    taskList: state.ToDoListReducer.taskList,
    taskEdit: state.ToDoListReducer.taskEdit,
  };
};

export default connect(mapStatetoProps)(ToDoList);
