import React, { useEffect, useState } from 'react'
import { Button, Typography, FormControl, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const UseStyles = makeStyles(() => ({
  formStyles: {
    backgroundColor: '#163461',
    padding: '28px',
    alignItems: 'center',
    borderRadius: '4%',
  },
  button: {
    width: 158,
    height: 60,
    borderRadius: 5,
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 19,
    letterSpacing: "0.13em"
  },
  bold: {
    fontWeight: 'bold'
  },
  input: {
    width: 400,
    height: 60,
    background: "white",
    marginBottom: 14,
    borderRadius: 5,
    padding: 2,
  },
  title: {
    fontSize: 34,
  },
}));

function UsersContainer(props) {
  const initialFormState = { id: '', name: '', email: '' }
  const [user, setUser] = useState(initialFormState);
  const classes = UseStyles();
  const buttonCon = props.editing ? 'Update' : 'Save';
  console.log(buttonCon)

  useEffect(() => {
    if (props.editing) {
      setUser(props.currentUser);
    }
  }, [props])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  const onSave = (event) => {
    event.preventDefault();
    if (props.editing) {
      props.updateUser(user);
    }
    else {
      if (!user.id || !user.name || !user.email) return;
      props.addUser(user);
      setUser(initialFormState);
    }
    props.handleClose();
    setUser(initialFormState);
  }

  return (
    <FormControl className={classes.formStyles} onSubmit={onSave}>
      {buttonCon === 'Save' &&
        <Typography component="h2" gutterBottom className={classes.title} color='primary'>
          Add User
        </Typography>
      }
      {buttonCon === 'Update' &&
        <Typography variant="h7" component="h2" gutterBottom className={classes.title}>
          Update User
        </Typography>
      }
      <TextField variant="outlined" className={classes.input} label="ID" type="text" name="id" value={user.id} onChange={handleInputChange} InputProps={{ classes: { input: classes.bold } }}></TextField>
      <TextField variant="outlined" className={classes.input} label="Name" type="text" name="name" value={user.name} onChange={handleInputChange} InputProps={{ classes: { input: classes.bold } }}></TextField>
      <TextField variant="outlined" className={classes.input} label="Email" type="email" name="email" value={user.email} onChange={handleInputChange} InputProps={{ classes: { input: classes.bold } }}></TextField>
      <Button className={classes.button} variant="contained" color="secondary" onClick={onSave}>{buttonCon}</Button>
    </FormControl>
  )
}

export default UsersContainer;
