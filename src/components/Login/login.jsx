import React from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import { Input, createField } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import {login} from '../../redux/auth-reducer';
import { Redirect } from 'react-router';
import style from '../common/FormsControls/FormsControls.module.css';

const afterSubmit = (result, dispatch) =>
  dispatch(reset('ordersTradesSearchForm'));

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required], Input, {type: "password"})}
            {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}
            <div className={style.formSummaryError}>
                {error}
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
        const onSubmit = (formData, dispatch) => {   
            //dispatch(reset("login"));
            props.login(formData.email, formData.password, formData.rememberMe);
        }

        if (props.isAuth) {
            return <Redirect to={"/profile"} />
        }

    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>

}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, {login}) (Login);