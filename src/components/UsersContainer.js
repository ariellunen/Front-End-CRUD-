import React, { useState, useEffect } from 'react';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Typography, Fab, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import UsersList from './UsersList';
import UserForm from './UserForm';
import * as userActions from '../store/action/user';

const useStyles = makeStyles(() => ({
    dataStyles: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '3%',
    },
    title: {
        marginTop: '1.5%',
        fontSize: 100,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addUserCon: {
        marginLeft: 35,
    },
    addIcon: {
        height: 70,
        width: 70,
        marginLeft: 15,
    },
    icon: {
        height: 45,
        width: 45,
        color: 'primary',
    },
}));


function UsersContainer() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [editing, setEditing] = useState(false);
    const initialFormState = { id: '', name: '', email: '' }
    const [currentUser, setCurrentUser] = useState(initialFormState);
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.user);
    const theme = createTheme({
        typography: {
            fontFamily: [
                'Oswald',
                'Glory',
                'sans-serif'
            ].join(','),
        },
        palette: {
            primary: {
                main: '#fafafa'
            },
            secondary: {
                main: '#ee773f'
            }
        },
        overrides: {
            MuiTableCell: {
                body: {
                    color: 'primary',
                    fontSize: 20,
                }
            }
        }
    })
    useEffect(() => {
        if (selector.users) {
            setUsers(selector.users)
        }
    }, [selector])

    const addUser = (user) => {
        dispatch(userActions.addUser(user.id, user.name, user.email))
    }

    const editUser = (user, i) => {
        setEditing(true);
        setCurrentUser({ id: user.id, name: user.name, email: user.email, index: i });
        handleOpen();
    }

    const deleteUser = (id) => {
        dispatch(userActions.deleteUser(id));
    }

    const updateUser = (userUpdates) => {
        setEditing(false);
        dispatch(userActions.updateUser(userUpdates, currentUser.index))
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <UserForm
            addUser={addUser}
            editing={editing}
            setEditing={setEditing}
            currentUser={currentUser}
            updateUser={updateUser}
            handleClose={handleClose}
        />
    );

    return (
        <ThemeProvider theme={theme}>
            <Typography gutterBottom className={classes.title}>
                Users Records
            </Typography>
            <Grid container className={classes.dataStyles} >
                <Grid item>
                    <UsersList
                        users={users}
                        deleteUser={deleteUser}
                        editUser={editUser}
                    />
                </Grid>
                <Grid item className={classes.addUserCon}>
                    <Fab color="secondary" varient="round" onClick={handleOpen} className={classes.addIcon}>
                        <AddIcon className={classes.icon} color='primary' />
                    </Fab>
                    <Modal
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {body}
                    </Modal>
                </Grid>
            </Grid>
        </ThemeProvider>
    )

}

export default UsersContainer;
