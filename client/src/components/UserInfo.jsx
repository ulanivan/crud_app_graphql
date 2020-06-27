import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GetAllUsers from '../queries/GetAllUsers';
import DeleteUser from '../queries/DeleteUser';
import UpdateUser from '../queries/UpdateUser';

export const UserInfo = ({ userInfoVisible, setUserInfoVisible, user }) => {
	const [ userName, setUserName ] = useState(user.name);
	const [ userEmail, setUserEmail ] = useState(user.email);
	
	useEffect(() => {
		setUserName(user.name);
		setUserEmail(user.email);
	}, [user])

	const [ deleteUser ] = useMutation(DeleteUser, {
		variables: {
			id: user.id
		},
		refetchQueries: [{ query: GetAllUsers }]
	})

	const [ updateUser ] = useMutation(UpdateUser, {
		variables: {
			id: user.id,
			input: {name: userName, email: userEmail}
		},
		refetchQueries: [{ query: GetAllUsers }]
	})

	const closeModal = () => {
		setUserInfoVisible(false);
	}

	return (
		user ? <Box display="flex" justifyContent="center" p={2}>
			<Dialog open={userInfoVisible} onClose={() => setUserInfoVisible(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">About User</DialogTitle>
        <DialogContent>
					<Box display="flex" flexDirection="column" style={{width: '360px'}}>
						<TextField
							value={userName}
							margin="dense"
							id="name"
							label="Name"
							type="text"
							onChange={(e) => setUserName(e.target.value)}
						/>
						<TextField
							value={userEmail}
							margin="dense"
							id="email"
							label="Email Address"
							type="email"
							onChange={(e) => setUserEmail(e.target.value)}
						/>
					</Box>
        </DialogContent>
					<Box display="flex" justifyContent="space-between" p={1}>
						<Button onClick={() => {
							deleteUser()
							closeModal()
						}} variant="contained" color="secondary">
							Delete user
						</Button>
						<div>
							<Button onClick={() => {
								updateUser()
								closeModal()
							}} color="primary">
								Save
							</Button>
							<Button onClick={() => closeModal()} color="primary">
								Cancel
							</Button>
						</div>
					</Box>
      </Dialog>
		</Box> : null
	);
}