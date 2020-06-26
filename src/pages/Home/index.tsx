import React, { Component } from "react";
import TodoList from "../../components/TodoList";

import "./styles.scss";

export default class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <div className="container">
          <TodoList />
        </div>
      </div>
    );
  }
}
