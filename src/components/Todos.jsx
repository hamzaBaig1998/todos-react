import React, { Component } from "react";
import { Table } from "react-bootstrap";

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      loading: false,
      originalTodos: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((todos) =>
        this.setState({ todos: todos }, () => {
          console.log("TODOS:", this.state.todos);
          this.setState({ loading: false });
          this.setState({ originalTodos: todos });
        })
      );
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    return (
      <>
        <div className="container mb-4">
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                placeholder="search"
                className="form-control"
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    const filteredTodos = this.state.originalTodos.filter(
                      (todo) => todo.title.includes(e.target.value)
                    );
                    this.setState({ todos: filteredTodos }, () => {
                      console.log("Filtered Todos:", this.state.todos);
                    });
                  }
                }}
              ></input>
            </div>
            <div className="col-md-6">
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  if (e.target.value != "-") {
                    const filteredTodos = this.state.originalTodos.filter(
                      (todo) => `${todo.completed}` == e.target.value
                    );
                    this.setState({ todos: filteredTodos }, () => {
                      console.log("Filtered Todos:", this.state.todos);
                    });
                  } else {
                    this.setState({ todos: this.state.originalTodos }, () => {
                      console.log("Filtered Todos:", this.state.todos);
                    });
                  }
                }}
              >
                <option selected>-</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>
          </div>
        </div>
        {this.state.loading ? (
          "Loading..."
        ) : this.state.todos.length > 0 ? (
          <Table>
            <thead style={{ background: "#eee" }}>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => {
                return (
                  <tr>
                    <td>{todo.id}</td>
                    <td>{todo.title}</td>
                    <td>{todo.completed ? "true" : "false"}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <div
            class="alert"
            style={{ background: "#ff0000", color: "#fff" }}
            role="alert"
          >
            No result for the given parameter!
          </div>
        )}
      </>
    );
  }
}

export default Todo;
