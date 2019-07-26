import React from 'react';
import axios from 'axios';
import {connect } from 'react-redux';

class Users extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            users: []
        }
        }
    
    async componentDidMount(){//Definimios qué va a pasaar cada vez que se monte el componente
        try {
            const res = await axios.get('http://localhost:3001/users/all')
            this.setState({users: res.data});
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
        <div className="users">
            Estos son los usuarios:
            {/* React puede pillar arrays, pero no objetos. Así que hay que definir qué propiedades de los objetos queremos que aparezcan en el frontend */}
            {this.state.users.map(user=>(
            <div>
            <h3>{user.name}</h3>
            <span>{user.email}</span>
            </div>))}
        </div>)
    }
}

const mapStateToProps=state=>{
    return {
        users:state.userReducer.users 
    }
}
export default connect(mapStateToProps)(Users);