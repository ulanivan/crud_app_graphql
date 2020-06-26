import gql from 'graphql-tag';

const DeleteUser = gql`
		mutation DeleteUser($id: ID!) {
			deleteUser(id: $id) {
				id
			}
		}
`;

export default DeleteUser;