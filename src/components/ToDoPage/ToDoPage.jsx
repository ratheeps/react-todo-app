import React from "react";
import ToDoList from "./ToDoList"
import CreateToDo from "./CreateToDo";
import style from "./style.css";
import {connect} from 'react-redux';
import {TaskActions} from '../../actions';
import { withRouter } from 'react-router-dom';


class ToDoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks : {},
            isLoading : false
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        this.props.loadTasks().then(() => {
            this.setState({isLoading: false});
        });
    }

    render() {
        return (
            <div className="todo container">
                { this.loader() }
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

    loader(){
        if (this.state.isLoading){
            return (
                <div id="loading-wrapper" >
                    <div id="loading-text">LOADING</div>
                    <div id="loading-content"></div>
                </div>
            )
        }
        return '';
    }

    createTask(task) {
        this.setState({isLoading: true});
        this.props.createTask({description : task}).then(() =>{
            this.setState({isLoading: false});
        });
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
        this.setState({isLoading: true});
        this.props.updateTask(id, value).then(() => {
            this.setState({isLoading: false});
        });
    }

    editTask(task, newValue) {
        let id = task.id;
        let value = {
            description : newValue.description,
            status : task.status,
            note : task.note,
            priority : task.priority,
        };
        this.setState({isLoading: true});
        this.props.updateTask(id, value).then(() => {
            this.setState({isLoading: false});
        });
    }

    deleteTask(task) {
        this.setState({isLoading: true});
        this.props.deleteTask(task).then(()=>{
            this.setState({isLoading: false});
        });
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

const connectedToDoPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(ToDoPage));
export {connectedToDoPage as ToDoPage};