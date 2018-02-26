import React from "react";
import ToDoList from "./ToDoList"
import CreateToDo from "./CreateToDo";
import style from "./style.css";
import {connect} from 'react-redux';
import {TaskActions} from '../../actions';

const task = {
    items: [],
    lsKey: "tasks",
    populate() {
        this.items = this.get();
    },
    get() {
        try {
            return JSON.parse(localStorage.getItem(this.lsKey)) || []
        } catch (e) {
        }
        return [];
    },
    save() {
        localStorage.setItem(this.lsKey, JSON.stringify(this.items));
    },
    toggle(id) {
        let todoItem = this.items[id];
        todoItem.isCompleted = !todoItem.isCompleted;
        this.save();
    },
    add(obj) {
        this.items.push(obj);
        this.save();
    },
    remove(id) {
        this.items.splice(id, 1);
        this.save();
    },
    update(id, task) {
        let todoItem = this.items[id];
        todoItem.task = task;
        this.save();
    }
};

// task.populate();


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
                    tasks={this.props.tasks}
                    toggleTask={this.toggleTask.bind(this)}
                    editTask={this.editTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                />
            </div>
        );
    }

    createTask(task) {
        this.props.createTask(task);
    }

    toggleTask(taskId) {
        task.toggle(taskId);
        this.setState({tasks: this.state.tasks});
    }

    editTask(taskId, task) {
        task.update(taskId, task);
        this.setState({tasks: this.state.tasks});
    }

    deleteTask(taskId) {
        task.remove(taskId);
        this.setState({tasks: this.state.tasks});
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
    }
});

const connectedToDoPage = connect(mapStateToProps, mapDispatchToProps)(ToDoPage);
export {connectedToDoPage as ToDoPage};