import React from 'react';
import './Register.css';
import { isEmail } from 'validator'
import { registerUser } from '../../../redux/actions/user';




class Register extends React.Component { //componente de clase

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            validForm: true,
            errorEmail: "",
            errorPassword: "",
            backendInfo: ''//en users.js del backend hemos decidido que se envíe un mensaje de info
        }
        this.emailInput = React.createRef()
    }

    handleSubmit = async  event => {
        event.preventDefault();
        try {
            await this.validateForm();
            if (this.state.validForm) {
            const res = await registerUser(this.state);//registerUser es la acción que hemos definido en actions
                this.setState({backendInfo:res.data.info});
            
            }
        }
        catch (error) {
            console.error(error);

        }
    }
    validateForm = () => {
        // this.validateName();
        this.validateEmail();
        this.validatePassword();
        // resolve('form validado')//resolvemos la promesa para que no se quede pendiente addet
    }
    validatePassword = () => {
        const password = this.state.password
        if (password.length === 0) this.setState({ validForm: false, errorPassword: "password is required" })
        else if (password.length < 8) {
            this.setState({ validForm: false, errorPassword: "password must be at least 8 characters" })
        }
    }
    validateEmail = () => {
        if (this.state.email.length === 0) this.setState({ validForm: false, errorEmail: "Email is required" });
        else if (!isEmail(this.state.email)) this.setState({ validForm: false, errorEmail: "must be an email" });
    }

    handleChange = event => this.setState({ [event.target.name]: event.target.value })

    render() {

        if (this.props.history.location.hash === "#email" && this.emailInput.current) this.emailInput.current.focus()
        return (
            <div className="register">
            <div className="container">
            <img className="icon" src="/images/profile-user-icon.png"/>
            <h2>Register</h2>
            <form className="registerForm" onSubmit={this.handleSubmit}>

                <input type="text" name="name" placeholder="Introduzca su nombre"
                    onChange={this.handleChange} value={this.state.name} />

                <input type="text" name="email" placeholder="Introduzca su email"
                    onChange={this.handleChange} value={this.state.email} ref={this.emailInput} />

                <div className="error"> {this.state.errorEmail} </div>

                <input type="password" name="password" placeholder="Introduzca su contraseña"
                    onChange={this.handleChange} />

                <div className="error"> {this.state.errorPassword} </div>

                <button type="submit">Enviar</button>

                <div className="info">{this.state.backendInfo}</div>
                
            </form>
            </div>
            </div>
        )

    }
}
export default Register;