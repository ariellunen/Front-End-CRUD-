import { ADD_USER, DELETE_USER, UPDATE_USER } from '../action/user';
import User from '../../model/user';

const initialState = {
    users: [],
    id: null,
    name: null,
    email: null,
};

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_USER:{
            const newUser = new User(
                action.userData.id,
                action.userData.name,
                action.userData.email,
            );
            return {
                users: state.users.concat(newUser)
            };
        }
        case DELETE_USER: {
            return{
                users: state.users.filter((user) => user.id !== action.id)
            }
        }
        case UPDATE_USER:{
            const newArray = [...state.users];
            newArray[action.user.ind] = action.user.user; 
            return{
                ...state,
                users: newArray
            }
        }
        default:
            return state;
    }
}
