import React, { Component } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import { Form, FormGroup, Input } from "reactstrap";
import ConfirmDelete from "./ConfirmDelete";

class AddNewTodos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      id: 0,
      todo: "",
      status: false,
      isEdit: false
    };
  }
  componentDidMount() {
    axios
      .get(`https://cobacoba-hayepe.herokuapp.com/`)
      .then(result => {
        this.setState({
          todos: result.data
        });
      })
      .catch(error => console.log(error));
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleChangeEdit = (event, index) => {
    console.log(event);
    const { value } = event.target;

    const todos = [...this.state.todos];
    todos[index]["todo"] = value;

    this.setState({
      todos
    });
  };
  submitTodos = event => {
    event.preventDefault();
    const { todos, ...ambilSisanya } = this.state;
    console.log(ambilSisanya);
    axios
      .post(`https://cobacoba-hayepe.herokuapp.com/`, ambilSisanya)
      .then(result => {
        console.log(result);
        this.setState({
          todo: "",
          todos: result.data.todos
        });
      })
      .catch(error => console.log(error));
    // console.log(this.state);
  };

  editTodo = index => {
    const todos = [...this.state.todos];
    console.log(todos);

    todos[index].isEdit = true;
    this.setState({
      todos
    });
  };

  updateTodos = index => {
    // event.preventDefault();
    const todos = [...this.state.todos];
    todos[index].isEdit = false;
    axios
      .put(`https://cobacoba-hayepe.herokuapp.com/${this.state.id}`, this.state)
      .then(result => {
        this.setState({
          todos
        });
      })
      .catch(error => console.log(error));
  };
  deleteTodos = namaBolehApaAja => {
    // event.preventDefault();
    axios
      .delete(`https://cobacoba-hayepe.herokuapp.com/${namaBolehApaAja}`)
      .then(result => {
        this.setState({
          todos: result.data
        });
      })
      .catch(error => console.log(error));
  };
  render() {
    // console.log(this.state.todos);
    const { id, todo, status, isEdit } = this.state;
    return (
      <div style={{ textAlign: "center", fontSize: 20, marginTop: 100 }}>
        <h1>Your Activity ToDo</h1>
        <Form style={{ display: "-webkit-inline-box", padding: "50px" }} onSubmit={this.submitTodos}>
          {/* <FormGroup style={{ width: 300 }}>
            <Input type="text" name="id" value={id} onChange={this.handleChange} />
          </FormGroup> */}
          <FormGroup style={{ width: 300 }}>
            <Input type="text" name="todo" value={todo} onChange={this.handleChange} />
          </FormGroup>
          {/* <FormGroup style={{ width: 300 }}>
            <Input type="text" name="status" value={status} onChange={this.handleChange} />
          </FormGroup> */}
          {/* <FormGroup style={{ width: 300 }}>
            <Input type="text" name="isEdit" value={isEdit} onChange={this.handleChange} />
          </FormGroup> */}
          <div>
            <Button style={{ marginLeft: 10 }} outline color="secondary">
              Add Todo
            </Button>
            {/* <Button style={{ marginLeft: "10px" }} outline color="secondary" onClick={this.updateTodos}>
              Edit Todo
            </Button>
            <Button style={{ marginLeft: "10px" }} outline color="secondary">
              Remove Todo
            </Button> */}
            <div>
              <ul>
                {this.state.todos &&
                  this.state.todos.map((data, index) => (
                    <React.Fragment key={index}>
                      {this.state.todos[index].isEdit ? (
                        <React.Fragment>
                          <input type="text" value={data.todo} onChange={event => this.handleChangeEdit(event, index)} />
                          <span onClick={() => this.updateTodos(index)}> update todo </span>
                          <span onClick={() => this.updateTodos(index)}> Cancel </span>
                        </React.Fragment>
                      ) : (
                        <li>
                          {data.todo} <ConfirmDelete type="button" style={{ marginLeft: "10px" }} deleteTodo={() => this.deleteTodos(data.id)} />
                          <button onClick={() => this.editTodo(index)}>edit</button>
                        </li>
                      )}
                    </React.Fragment>
                  ))}
              </ul>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}
export default AddNewTodos;
