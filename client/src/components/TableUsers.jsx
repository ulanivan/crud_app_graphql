import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { AddUser } from './AddUser';
import GetAllUsers from '../queries/GetAllUsers';
import { UserInfo } from './UserInfo';


export const TableUsers = () => {
	const { data } = useQuery(GetAllUsers);
	const [ user, setUser ] = useState(null);
	const [ userInfoVisible, setUserInfoVisible ] = useState(false);
	const allUsers = data ? data.users : null;
	const userInfo = user ? <UserInfo 
											userInfoVisible={userInfoVisible}
											setUserInfoVisible={setUserInfoVisible}
											user={user}
									/> : null

	const getUser = (user) => {
		setUserInfoVisible(true)
		setUser(user);
	}

	const table = allUsers ? <TableContainer component={Paper}>
	<Table aria-label="simple table">
		<TableHead>
			<TableRow selected={true}>
				<TableCell>Name</TableCell>
				<TableCell align="center">Email</TableCell>
			</TableRow>
		</TableHead>
		<TableBody>
			{allUsers.map((row) => (
				<TableRow style={{cursor: 'pointer'}} onClick={() => getUser(row)} hover={true} key={row.name}>
					<TableCell component="th" scope="row">
						{row.name}
					</TableCell>
					<TableCell align="center">{row.email}</TableCell>
				</TableRow>
			))}
		</TableBody>
	</Table>
</TableContainer> : null

	return (
		<div>
			{table}
			<AddUser />
			{userInfo}
		</div>
	);
}