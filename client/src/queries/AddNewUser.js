import gql from 'graphql-tag';

const AddNewUser = gql`
	mutation CreateUser($input: CreateUserInput!) {
		createUser(input: $input) {
			id
			name
			email
		}
	}
`;

export default AddNewUser;