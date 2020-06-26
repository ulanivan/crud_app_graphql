import gql from 'graphql-tag';

const UpdateUser = gql`
	mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
		updateUser(id: $id, input: $input) {
			id
		}
	}
`;

export default UpdateUser;