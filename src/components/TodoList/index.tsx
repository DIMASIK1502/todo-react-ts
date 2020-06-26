import React, { Component, ChangeEvent } from "react";
import { connect } from "react-redux";
import { RootState } from "../../app/store";
import { addTodo } from "../../app/reducers/todo";
import TodoItem from "../TodoItem";
import "./styles.scss";

interface Props {
  list: Todo[];
  addTodo: (todo: Todo) => void;
}
interface State {
  todoText: string;
}

class TodoList extends Component<Props> {
  state: State = {
    todoText: "",
  };

  onAddTodo = (): void => {
    const { todoText } = this.state;
    const { addTodo, list } = this.props;

    const id = list.length ? list[0].id + 1 : 1;

    this.setState({ todoText: "" });
    addTodo({ id, complete: false, task: todoText });
  };

  onTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ todoText: e.target.value });
  };

  render() {
    const { list } = this.props;
    const { todoText } = this.state;
    return (
      <div className="todo-list-component">
        <div className="todo-list-actions">
          <input
            value={todoText}
            onChange={this.onTextChange}
            className="todo-text-input"
          />
          <button
            disabled={!todoText.length}
            onClick={this.onAddTodo}
            className="todo-add-btn"
          >
            Добавить
          </button>
        </div>
        <div className="todo-list-content">
          {list.map((item: Todo, index: number) => (
            <TodoItem todo={item} key={`todo-item-${index}`} />
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    list: state.todo.list,
  };
}
export default connect(mapStateToProps, { addTodo })(TodoList);
