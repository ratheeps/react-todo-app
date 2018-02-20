import React from "react";

export default class TodoListItem extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    renderActionSection () {
        if (this.state.isEditing) {
            return (
                <td>
                    <button onClick={this.editTask.bind(this)}>Save</button>
                    <button className="cancel-btn" onClick={this.setEditState.bind(this, false)}>Cancel</button>
                </td>
            );
        }
        return (
            <td>
                <button onClick={this.setEditState.bind(this, true)}>Edit</button>
                <button className="delete-btn" onClick={this.deleteTask.bind(this)}>Delete</button>
            </td>
        );
    }

    renderTask () {
        const { task, isCompleted } = this.props;
        const taskStyle = {
            cursor: "pointer"
        };

        if (this.state.isEditing) {
            return (
                <td>
                    <form onSubmit={this.editTask.bind(this)}>
                        <input ref="task" defaultValue={task} autoFocus />
                    </form>
                </td>
            );
        }

        return (
            <td style={taskStyle}>
                <div class="toggle">
                    <input
                        name="isSuccess"
                        type="checkbox"
                        checked={isCompleted}
                        className="successCheck"
                        onChange={this.toggleTask.bind(this)} />
                    <label></label>
                </div>
                <p className="title">{task}</p>
            </td>
        );
    }

    render () {
        const { isCompleted } = this.props;
        return (
            <tr className={"todo-" + (isCompleted ? "completed" : "not-completed") }>
                {this.renderTask()}
                {this.renderActionSection()}
            </tr>
        )
    }

    setEditState (isEditing) {
        this.setState({
            isEditing
        });
    }

    toggleTask () {
        this.props.toggleTask(this.props.id);
    }

    editTask (e) {
        this.props.editTask(this.props.id, this.refs.task.value);
        this.setState({
            isEditing: false
        });
        e.preventDefault();
    }

    deleteTask () {
        this.props.deleteTask(this.props.id);
    }
}
