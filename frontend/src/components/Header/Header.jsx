import React from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import './Header.css';
import { logoutUser } from '../../redux/actions/user';




export function Header (props){//exportamos el componente para poder testearlo
  
  const handleClick = async (event) => {
    localStorage.removeItem('authToken');
    await logoutUser();
    console.log(props.user)
   
  }

  
  return(
  
    <ul className ="navbar">
    <div className="constantNavbar">
    <li> <NavLink className="navLink" activeClassName="is-active" to="/" exact>Home</NavLink> </li>
    <li> <NavLink className="navLink" activeClassName="is-active" to="/users" exact>Users</NavLink> </li>
    </div>
    {props.user  ?

    <div className ="isLoggedIn">
     
      <li><NavLink className="navLinkName profileNavbar"  to="/profile/">
        <img className="profilePhoto" src={props.user.profilePhoto}/>
          {props.user.name}
          </NavLink></li>
        
        <li> <NavLink className="navLink navLogout" activeClassName="is-active" onClick = {handleClick} to="/logout/">Logout</NavLink></li>
      </div>
      :
      <div className="isNotLoggedIn">
          <li> <NavLink className="navLink" activeClassName="is-active" to="/register/">Register</NavLink></li>
          <li> <NavLink className="navLink" activeClassName="is-active" to="/login/">Login</NavLink></li>
      </div>
    }
  </ul>
  
  )
};

const mapStateToProps = (state) => {//mapeamos el state y lo pasamos a props de Header
  return {
  user:state.userReducer.user//este user es la prop user del state, que se añade en el dispatch de user.js
  }
}


export default connect (mapStateToProps) (Header);//conectamos header con store