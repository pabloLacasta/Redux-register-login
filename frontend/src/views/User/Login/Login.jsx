import React from 'react';
import { loginUser } from '../../../redux/actions/user.js';
import './Login.css';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password: '',
            backendInfo: '',
            emailError:'',
            passwordError:''
        }
    }

    handleChange = event =>  this.setState({[event.target.name]:event.target.value});

    handleSubmit = async event => {
        event.preventDefault();
        
        try {
            const res = await loginUser(this.state);
            this.setState({backendInfo: res.data.info})
            setTimeout(() => {
                this.props.history.push('/profile')
            }, 1);
            
        } catch (error) {
            console.log(error);
            
        }
    }

 render(){
     return( 
        <div className='login'>
        <div className = 'container'>
            <img className="icon" src="/images/profile-user-icon.png"/>
            <h2>Sign In</h2>
        <form className='loginForm' onSubmit= {this.handleSubmit}>
         <input type="text" name='email' placeholder="Usuario o email" onChange ={this.handleChange}/>
         <input type="password" name='password' placeholder="Contraseña" onChange ={this.handleChange}/>
         <button className="button" type="submit">Login</button>
        </form>
        <h1 className ="infoBackend" >{this.state.backendInfo}</h1>
        </div>
        </div>
     )}
}
export default Login;