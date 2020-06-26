import React, { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GetAllUsers from '../queries/GetAllUsers';
import AddNewUser from '../queries/AddNewUser';

export const AddUser = () => {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const [ createUser ] = useMutation(AddNewUser, {
		variables: {
			input: {name, email}
		},
		refetchQueries: [{ query: GetAllUsers }]
	});

	const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
	};

	return (
		<Box display="flex" justifyContent="center" p={2}>
			<Button variant="contained" color="primary" onClick={handleClickOpen}>
  			Add New User
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter name and email
          </DialogContentText>
					<Box display="flex" flexDirection="column" style={{width: '360px'}}>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Name"
							type="text"
							onChange={(e) => setName(e.target.value)}
						/>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Email Address"
							type="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
						createUser()
						handleClose()
					}} color="primary">
            Save
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
		</Box>
	);
}