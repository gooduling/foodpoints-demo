import React, { Component, PropTypes } from 'react';
import EditableImg from './EditableImge.jsx';
import defaultAvatar from '../../assets/images/defaultAvatar.jpg';

class SignInForm extends Component {
    handleSubmit() {
        const { handleSubmit } = this.props;
        const { email: {value: email}, password: {value: password}, name: {value: name}, city: {value: city} } = this.refs;
        if (email && password) handleSubmit({ email, password, name, city, avatar: this.avatar || defaultAvatar });
    }
    render() {
        const {switchLabel, buttonLabel, switchHandler} = this.props;
        return (
        <form className="userForm">
            <EditableImg
                defaultImg={defaultAvatar}
                onChangeHandler={(value)=>{this.avatar = value }}
            />
            <input ref="email" type="email" placeholder="Email" required/>
            <input ref="name" type="text" placeholder="Name" required/>
            <input ref="city" type="text" placeholder="City" defaultValue="San Francisco"/>
            <input ref="password" type="password" placeholder="Password" required/>
            <br/> 
            <button type="button" onClick={this.handleSubmit.bind(this)}>{buttonLabel || 'Save'}</button>
            {switchLabel ? <span>or <a onClick={switchHandler}>{switchLabel}</a></span> : null}
        </form>
        )
    }
}
SignInForm.propTypes = {
    buttonLabel: PropTypes.string,
    switchLabel: PropTypes.string,
    switchHandler: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired
};
export default SignInForm;