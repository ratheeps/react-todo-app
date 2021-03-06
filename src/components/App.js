import React from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../helpers';
import {AlertActions} from '../actions';
import {PrivateRoute} from './PrivateRoute';
import {ToDoPage} from './ToDoPage';
import {LoginPage} from './LoginPage';
import style from "./style.css";

class App extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch} = this.props;
        // history.listen((location, action) => {
        //     // clear alert on location change
        //     dispatch(AlertActions.clear());
        // });
    }

    render() {
        const {alert} = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert && alert.message && alert.message.message &&
                        <div className={`alert ${alert.type}`}>{alert.message.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={ToDoPage}/>
                                <PrivateRoute exact path="/tasks" component={ToDoPage}/>
                                <Route path="/login" component={LoginPage}/>
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {alert} = state;
    console.log(alert);
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};