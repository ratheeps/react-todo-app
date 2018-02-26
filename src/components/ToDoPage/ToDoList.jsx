import React from "react";
import ToDoListItem from "./ToDoListItem";

export default class ToDoList extends React.Component {
    renderItems () {
        return this.props.tasks.map((c, index) => {
            return (
                <ToDoListItem
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
        if (!this.props.tasks.length) {
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
