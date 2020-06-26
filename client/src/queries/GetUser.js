import gql from 'graphql-tag';

const GetUser = gql`
	query User($id: ID!) {
		user(id: $id) {
			id
			name
			email
		}
	}
`;

export default GetUser;