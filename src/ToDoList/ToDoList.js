import React, { Component } from "react";
import { Container } from "../components/Container";
import { ThemeProvider } from "styled-components";
import { ToDoListDarkTheme } from "../themes/ToDoListDarkTheme";
import { ToDoListLightTheme } from "../themes/ToDoListLightTheme";
import { ToDoListPrimaryTheme } from "../themes/ToDoListPrimaryTheme";
import { Dropdown } from "../components/Dropdown";
import { Heading1, Heading2, Heading3 } from "../components/Heading";
import { Label, TextField, Input } from "../components/TextField";
import { Button } from "../components/Button";
import { Table, Tr, Td, Th, Thead, Tbody } from "../components/Table";
//redux
import { connect } from "react-redux";
class ToDoList extends Component {
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
              <Button className='ml-2'>
                <i className='fa fa-edit'></i>
              </Button>{" "}
              <Button className='ml-2'>
                <i className='fa fa-check'></i>
              </Button>{" "}
              <Button className='ml-2'>
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
              <Button className='ml-2'>
                <i className='fa fa-trash'></i>
              </Button>{" "}
            </Th>
          </Tr>
        );
      });
  };
  render() {
    return (
      <ThemeProvider theme={this.props.themeToDoList}>
        <div>
          {" "}
          <Container className='w-75'>
            <Dropdown>
              <option>Dark Theme</option>
              <option>Light Theme</option>
              <option>Primary Theme</option>
            </Dropdown>
            <Heading3 className='text-left text-success mt-3'>
              TO DO LIST
            </Heading3>
            <TextField label=' Task name '></TextField>
            <Button className='ml-2'>
              <i className='fa fa-plus'></i> Add task
            </Button>
            <Button className='ml-2'>
              <i className='fa fa-upload'></i> Update task
            </Button>
            <hr />
            <Heading3 className='text-left'>Task to do</Heading3>
            <Table>
              <Thead>{this.renderTaskToDo()}</Thead>
            </Table>
            <hr />
            <Heading3 className='text-left'>Task Complete</Heading3>
            <Table>
              <Thead>{this.renderTaskDone()}</Thead>
            </Table>
          </Container>
        </div>
      </ThemeProvider>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    themeToDoList: state.ToDoListReducer.themeToDoList,
    taskList: state.ToDoListReducer.taskList,
  };
};
export default connect(mapStatetoProps)(ToDoList);
