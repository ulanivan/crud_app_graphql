import gql from 'graphql-tag';

const GetAllUsers = gql`
		query {
			users {
				id
				name
				email
			}
		}
`;

export default GetAllUsers;