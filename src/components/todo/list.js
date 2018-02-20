import React from "react";
import TodoListItem from "./list-item";

export default class TodoList extends React.Component {
    renderItems () {
        return this.props.todos.map((c, index) => {
            return (
                <TodoListItem
                    key={index}
                    {...c}
                    id={index}
                    toggleTask={this.props.toggleTask}
                    editTask={this.props.editTask}
                    deleteTask={this.props.deleteTask}
                />
            )
        });
    }
    render () {
        if (!this.props.todos.length) {
            return <p className="first-todo">Create your first todo! :)</p>;
        }
        return (
            <table>
                <tbody>
                    {this.renderItems()}
                </tbody>
            </table>
        )
    }
}
