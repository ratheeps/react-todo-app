import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {UserActions} from '../../actions';
import style from "./style.css";
class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(UserActions.logout());

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
        const {dispatch} = this.props;
        if (username && password) {
            dispatch(UserActions.login(username, password));
        }
    }

    render() {
        const {loggingIn} = this.props;
        const {username, password, submitted} = this.state;
        return (
            <div className="form">
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

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export {connectedLoginPage as LoginPage};