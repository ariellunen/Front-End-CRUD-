import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableCell, TableContainer, Table, Fab, Typography, TableBody, TableRow } from '@material-ui/core';
import Edit from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    tableStyle: {
        width: 800,
        height: 540,
        borderRadius: 10,
        boxShadow: "0px 20px 40px rgba(238,119,63,255)",
    },
    title: {
        marginTop: 8,
        fontSize: 45,
    },
    buttonSize: {
        height: 40,
        width: 40,
    }
})

function UsersList(props) {
    const classes = useStyles();
    return (
        <TableContainer className={classes.tableStyle}>
            {(props.users.length !== 0 && <Table>
                {props.users.map((user, i) => (
                    <TableBody key={i}>
                        <TableRow>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Fab className={classes.buttonSize} color="secondary" aria-label="edit" onClick={() => props.editUser(user, i)} varient="round">
                                    <Edit color="primary" />
                                </Fab>
                            </TableCell>
                            <TableCell>
                                <Fab className={classes.buttonSize} color="secondary" aria-label="delete" onClick={() => props.deleteUser(user.id)} varient="round">
                                    <DeleteIcon color="primary" />
                                </Fab>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ))
                }
            </Table>)}
            {(props.users.length === 0 &&
                <Typography gutterBottom className={classes.title}>
                    No Users Recorded
                </Typography>
            )}
        </TableContainer>
    )
}

export default UsersList;