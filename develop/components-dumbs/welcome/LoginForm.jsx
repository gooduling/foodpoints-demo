import React, { Component, PropTypes } from 'react';

class LoginForm extends Component {
    handleSubmit() {
        const { handleLogin } = this.props;
        const { email: {value: email}, password: {value: password} } = this.refs;
        if (email && password) handleLogin({ email, password });
    }
    render() {
        const {switchLabel, switchHandler} = this.props;
        return (
        <form className="signInForm">
            <input ref="email" type="email" placeholder="Email" defaultValue="test@email.com"/>
            <input ref="password" type="password" placeholder="Password" defaultValue="112233"/>
            <br/>
            <button type="button" onClick={this.handleSubmit.bind(this)}>Login</button>
            {switchLabel ? <span>or <a onClick={switchHandler}>{switchLabel}</a></span> : null}
        </form>
        )
    }
}
LoginForm.propTypes = {
    switchLabel: PropTypes.string,
    switchHandler: PropTypes.func,
    handleLogin: PropTypes.func.isRequired
};

export default LoginForm;
