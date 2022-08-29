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
class ToDoList extends Component {
  render() {
    return (
      <ThemeProvider theme={ToDoListPrimaryTheme}>
        <div>
          {" "}
          <Container className='w-50'>
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
              <Thead>
                <Tr>
                  <Th className='text-left'> Task name </Th>
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
              </Thead>
            </Table>
            <hr />
            <Heading3 className='text-left'>Task Complete</Heading3>
            <Table>
              <Thead>
                <Tr>
                  <Th className='text-left'> Task name </Th>
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
              </Thead>
            </Table>
          </Container>
        </div>
      </ThemeProvider>
    );
  }
}

export default ToDoList;
