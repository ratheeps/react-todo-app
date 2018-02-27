import React from 'react';
import {connect} from 'react-redux';
import {UserActions} from '../../actions';
import style from "./style.css";
import { history } from '../../helpers';
import { withRouter } from 'react-router-dom';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const {username, password} = this.state;
        if (username && password) {
            this.props.logIn(username, password).then(function () {
                history.push('/tasks');
            });
        }
    }

    logOut(){
        this.props.logOut();
    }

    render() {
        const {username, password, submitted} = this.state;
        return (
            <div className="login-form">
                <h2 className="title">Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={(submitted && !username ? ' has-error' : '')}>
                        <input type="text" placeholder="Username" name="username" value={username}
                               onChange={this.handleChange}/>
                    </div>
                    <div className={(submitted && !password ? ' has-error' : '')}>
                        <input type="password" placeholder="Password" name="password" value={password}
                               onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {loggingIn} = state.authentication;
    return {
        loggingIn
    };
}

const mapDispatchToProps = (dispatch) =>({
    logIn(username, password) {
        return dispatch(UserActions.login(username, password))
    },
    logOut(){
        return dispatch(UserActions.logout())
    }
});

const connectedLoginPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
export {connectedLoginPage as LoginPage};