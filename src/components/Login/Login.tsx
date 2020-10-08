import React from 'react';
import { reduxForm, Field, reset, InjectedFormProps } from 'redux-form';
import { Input, createField } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import {login} from '../../redux/auth-reducer';
import { Redirect } from 'react-router';
import style from '../common/FormsControls/FormsControls.module.css';
import { AppStateType } from '../../redux/redux-store';

// const afterSubmit = (result, dispatch) =>
//   dispatch(reset('ordersTradesSearchForm'));

type LoginFormOwnProps = {
    captchaUrl: string | null
  }

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> 
= ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
            {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, {type: "password"})}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && createField("Symbols from image", "captcha", [required], Input, {}) }

            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm)

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
    captcha: string
    email: string
    password: string
    rememberMe: boolean
}


type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string> //Extract - берет только те ключи, который асайнятся к строке

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
        const onSubmit = (formData: any) => {   
            //dispatch(reset("login"));
            props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
        }

        if (props.isAuth) {
            return <Redirect to={"/profile"} />
        }

    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>

}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, {login}) (Login);