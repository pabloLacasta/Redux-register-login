import React from 'react';//useState: crea un estado en React en un componente funcional
import {connect} from 'react-redux';
import './Profile.css';
import { updateName } from '../../../redux/actions/user';


class Profile extends React.Component{
    constructor(props)  {
        super(props)
        this.state = {
            openEditName : false,
            name:''
        }
    }

    close = async (event) => {
        await this.setState({openEditName:false});
    };
 
    openEditName = async (event) =>{
       await this.setState({openEditName:true});
    };

    editName = async (event) => {
        this.setState({[event.target.name]: event.target.value })
    }

    submitNewName = async (event) => {
        try {
            await updateName(this.state.name);
    
        } catch (error) {
            
        }
    }

    componentDidMount(){
        this.submitNewName()
        console.log(this.props);
    }



    render(){
    return(
    <div className="profile">
        <div className="profileData">
            <img className="backgroundProfile" src={this.props.user.coverPhoto} />
            <img className="cameraBg" src="https://img.icons8.com/ios-glyphs/30/000000/camera.png"/>
        
            <div className="borderPhoto">
                <img className="photoProfile" src={this.props.user.profilePhoto}/>
                <img className="cameraProfile" src="https://img.icons8.com/ios-glyphs/30/000000/camera.png"/>
            </div>
            <div className="name">{this.props.user.name}
                <img className="pencil" src="https://img.icons8.com/material/24/000000/edit.png" onClick={this.openEditName}/>
            </div>
        </div>
        {this.state.openEditName === true ? 
        <div className="background">
                <div className="editName">
                <img className ="close" src="https://img.icons8.com/ios/50/000000/close-window.png" onClick={this.close}/>
                 <p className="saludoEditName">¡Hola {this.props.user.name}! <br /> ¿Quieres cambiar tu nombre? </p>
                 <input name ="name" type="text" placeholder="Su nuevo nombre" className="editNameInput" onChange={this.editName}/>
                 <button className="updateName" onClick={this.submitNewName}>Submit</button>
                </div>
            
        </div>
        :
        null}
        
    </div>
    )
}
};


const mapStateToProps = state =>{
    return {
        user: state.userReducer.user
    }
}
export default connect(mapStateToProps) (Profile);