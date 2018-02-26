import React from "react";
import ToDoList from "./ToDoList"
import CreateToDo from "./CreateToDo";
import style from "./style.css";
import {connect} from 'react-redux';
import {TaskActions, UserActions} from '../../actions';
const todos = {
    items: [],
    lsKey: "todos",
    populate () {
        this.items = this.get();
    },
    get () {
        try {
            return JSON.parse(localStorage.getItem(this.lsKey)) || []
        } catch (e) {}
        return [];
    },
    save () {
        localStorage.setItem(this.lsKey, JSON.stringify(this.items));
    },
    toggle (id) {
        let todoItem = this.items[id];
        todoItem.isCompleted = !todoItem.isCompleted;
        this.save();
    },
    add (obj) {
        this.items.push(obj);
        this.save();
    },
    remove (id) {
        this.items.splice(id, 1);
        this.save();
    },
    update (id, task) {
        let todoItem = this.items[id];
        todoItem.task = task;
        this.save();
    }
};

todos.populate();


class ToDoPage extends React.Component {
    constructor (props) {
        super(props);
        this.props.dispatch(TaskActions.index());
        this.state = {
            todos: todos.items
        };
    }
    render () {
        return (
            <div className="todo container">
                <h1>TODOs</h1>
                <CreateToDo
                    createTask={this.createTask.bind(this)}
                />
                <ToDoList
                    todos={this.state.todos}
                    toggleTask={this.toggleTask.bind(this)}
                    editTask={this.editTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                />
            </div>
        );
    }

    createTask (task) {
        task = task.trim();
        if (!task) { return; }
        todos.add({
            task,
            isCompleted: false
        });
        this.setState({ todos: this.state.todos });
    }

    toggleTask (taskId) {
        todos.toggle(taskId);
        this.setState({ todos: this.state.todos });
    }
    editTask (taskId, task) {
        todos.update(taskId, task);
        this.setState({ todos: this.state.todos });
    }
    deleteTask (taskId) {
        todos.remove(taskId);
        this.setState({ todos: this.state.todos });
    }
}


function mapStateToProps(state) {
    const {tasks} = state.tasks;
    return {
        tasks
    };
}

const connectedToDoPage = connect(mapStateToProps)(ToDoPage);
export {connectedToDoPage as ToDoPage};