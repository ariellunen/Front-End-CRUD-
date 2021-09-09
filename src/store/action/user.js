export const ADD_USER = 'ADD_USER';
export const GET_USER = 'GET_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';

export const addUser = (id, name, email) => ({type: ADD_USER, userData: {id, name, email}});

export const deleteUser = (id) => ({type: DELETE_USER, id: id})

export const updateUser = (user, ind) => ({type: UPDATE_USER, user: {user,ind}})
