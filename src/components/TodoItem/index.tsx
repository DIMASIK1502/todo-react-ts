import React, { Component, ChangeEvent, MouseEvent, FocusEvent } from "react";
import { connect } from "react-redux";
import { removeTodo, editTodo } from "../../app/reducers/todo";

import "./styles.scss";

interface Props {
  todo: Todo;
  removeTodo: (id: number) => void;
  editTodo: (todo: Todo) => void;
}
interface State {
  edit: boolean;
  complited: boolean;
  task: string;
}

class TodoItem extends Component<Props, State> {
  saveBtnRef = React.createRef<HTMLButtonElement>();
  state = {
    edit: false,
    complited: false,
    task: "",
  };

  onRemoveTodo = (id: number): void => {
    const { removeTodo } = this.props;
    removeTodo(id);
  };

  onEditTodo = (e: MouseEvent<HTMLButtonElement>): void => {
    const { todo, editTodo } = this.props;
    const { task, edit } = this.state;

    if (edit) {
      editTodo({ ...todo, task });
      this.setState({ edit: false, task: "" });
    } else {
      this.setState({ edit: true, task: todo.task });
    }
  };

  onTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ task: e.target.value });
  };
  onBlurChange = (e: FocusEvent<HTMLInputElement>): void => {
    //Наверное это костыль :)
    if (e.relatedTarget !== this.saveBtnRef.current) {
      this.setState({ edit: false });
    }
  };

  render() {
    const { edit, task } = this.state;
    const { todo } = this.props;
    return (
      <div className="todo-list-item">
        <div className="item-check">
          <span>{todo.id}</span>
        </div>
        <div className="item-task">
          {edit ? (
            <input
              onChange={this.onTextChange}
              autoFocus
              onBlur={this.onBlurChange}
              value={task}
              className="task-input"
            />
          ) : (
            <span>{todo.task}</span>
          )}
        </div>
        <button onClick={() => this.onRemoveTodo(todo.id)}>Удалить</button>
        <button ref={this.saveBtnRef} onClick={this.onEditTodo}>
          {edit ? "Сохранить" : "Редактировать"}
        </button>
      </div>
    );
  }
}
export default connect(null, { removeTodo, editTodo })(TodoItem);
