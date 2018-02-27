import React from "react";
import ToDoList from "./ToDoList"
import CreateToDo from "./CreateToDo";
import style from "./style.css";
import {connect} from 'react-redux';
import {TaskActions} from '../../actions';


class ToDoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks : {}
        };
    }

    componentDidMount() {
        this.props.loadTasks();
    }

    render() {
        return (
            <div className="todo container">
                <h1>TODOs</h1>
                <CreateToDo
                    createTask={this.createTask.bind(this)}
                />
                <ToDoList
                    tasks={this.props.tasks.all}
                    toggleTask={this.toggleTask.bind(this)}
                    editTask={this.editTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                />
            </div>
        );
    }

    createTask(task) {
        this.props.createTask({description : task});
    }

    toggleTask(task) {
        let id = task.id;
        let status = task.status === 'Created' ? 'Completed' : 'Created';
        let value = {
            description : task.description,
            status : status,
            note : task.note,
            priority : task.priority,
        };
        this.props.updateTask(id, value);
    }

    editTask(task, newValue) {
        let id = task.id;
        let value = {
            description : newValue.description,
            status : task.status,
            note : task.note,
            priority : task.priority,
        };
        this.props.updateTask(id, value);
    }

    deleteTask(task) {
        this.props.deleteTask(task);
    }
}


function mapStateToProps(state) {
    return {
        tasks : state.tasks
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadTasks() {
        return dispatch(TaskActions.index());
    },
    createTask(task) {
        return dispatch(TaskActions.create(task))
    },
    deleteTask(task) {
        return dispatch(TaskActions.remove(task))
    },
    updateTask(id, values) {
        return dispatch(TaskActions.update(id, values))
    }
});

const connectedToDoPage = connect(mapStateToProps, mapDispatchToProps)(ToDoPage);
export {connectedToDoPage as ToDoPage};