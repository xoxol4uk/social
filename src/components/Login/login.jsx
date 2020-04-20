import React from 'react';
import { reduxForm, Field, reset } from 'redux-form';

const afterSubmit = (result, dispatch) =>
  dispatch(reset('ordersTradesSearchForm'));

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"login"} name={"login"} component={"input"} />
            </div>
            <div>
                <Field placeholder={"password"} name={"password"} component={"input"} />
            </div>
            <div>
            <Field component={"input"} name={"rememberMe"} type={"checkbox"} />remember me
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
            dispatch(reset("login"));
            console.log(formData);
        }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>

}


export default Login;