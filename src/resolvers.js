import { User } from "./models/User"

export const resolvers = {
  Query: {
    user: (_, { id }) => User.findById(id),
    users: () => User.find()
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const user = new User(input);
      await user.save();
      return user;
    },
    deleteUser: async (_, { id }) => await User.findByIdAndRemove(id),
    updateUser: async (_, { id, input }) => await User.findByIdAndUpdate(id, input)
  }
}
