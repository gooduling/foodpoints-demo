import React, { Component, PropTypes } from 'react';
import SignUpForm from './SignInForm.jsx';
import LoginForm from './LoginForm.jsx'


class AuthFormWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeForm: 'login'
        };
    }
    handleSwitch(activeForm){
        this.setState({activeForm})
    }
    render() {
        const { handleSignUp, handleLogin } = this.props;
        return(<div className="signInWrapper">
            {this.state.activeForm === 'login'
                ? <LoginForm
                    handleLogin={handleLogin}
                    switchLabel="Sign Up"
                    switchHandler={()=>this.handleSwitch('signUp')}
                />
                : <SignUpForm
                    handleSubmit={handleSignUp}
                    switchLabel="Login"
                    buttonLabel="Sign Up"
                    switchHandler={()=>this.handleSwitch('login')}
                />
            }
        </div>)
    }
}
AuthFormWrapper.propTypes = {
    handleSignUp: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired
};

export default AuthFormWrapper;
