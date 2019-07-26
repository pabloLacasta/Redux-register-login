import store from '../store';
import axios from 'axios';

export const registerUser = async ( { name, email, password, profilePhoto } ) => {
    const res = await axios.post( 'http://localhost:3001/users/register', {
        name,
        email,
        password,
        profilePhoto
    } )
    const action = {
        type: 'REGISTER',
        payload: res.data.user,
    }
    localStorage.setItem('authToken',res.data.token) //añadimos el token al localStorage
    store.dispatch( action )
    return res;
}
export const getAllUsers = async () => {
    try {
        const res = await axios.get( 'http://localhost:3001/users/all' ); // hago la petición de todos los usuarios al backend
        const action = {
            type: 'GET_ALL',
            payload: res.data
        }
        store.dispatch( action );

    } catch ( error ) {
        console.log( error )
    }
}

export const loginUser = async (state) => {
    const res = await axios.post("http://localhost:3001/users/login", {
        email: state.email,
        password: state.password
    })
    const action = {
        type:'LOGIN',
        payload: res.data.user
    }
    store.dispatch(action);
    return res;
};

export const logoutUser =  () => {
    const token=localStorage.getItem('authToken'); 
     axios.get("http://localhost:3001/users/logout",
        {headers:{
            Authenticate:token
            }
        }
    )
    
    const action =  {
        type: 'LOGOUT',
        payload:  localStorage.removeItem('authToken')
    };
    store.dispatch(action);
    
};

// export const updateProfile =async(user)=>{
//     try{
//         const token=localStorage.getItem('authToken'); //sacamos del localStorage el token
//         if(!token) throw new Error('you are not authenticated');// si no hay token le enviamos error
//         const res=await axios.patch('http://localhost:3001/users/updateProfile', user,{
//             headers:{
//                 authenticate:token
//             }
//         });
        
//     }catch(error){
//         console.log(error)
//     }
// }

export const updateName =async(name)=>{
    try{
        const token=localStorage.getItem('authToken'); //sacamos del localStorage el token
        if(!token) throw new Error('you are not authenticated');// si no hay token le enviamos error
        const res=await axios.patch('http://localhost:3001/users/updateName', {name},{
            headers:{
                authenticate:token
            }
        });
        console.log(res.data.name)
        const action =  {
            type: 'EDIT_NAME',
            payload:  res.data
        };
        store.dispatch(action);
        
    }catch(error){
        console.log(error)
    }
}

