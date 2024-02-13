const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, { userId }, context) => {
      if (context.user) {
        return await User.findOne({ _id: userId});
      };
    },
  },

  Mutation: {
    login: async (parent, {email,password}) => {
      const user = await User.findOne({email:email});
      if (!user) {
        throw AuthenticationError
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError
      }

      const token = signToken(profile);
      return { token, profile };
    },
    addUser: async (parent, {username,email,password}) => {

      const user = await User.create({username,email,password})
      const token = signToken(user);

      return {token,user}
    },
    saveBook: async (parent, body, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: body } },
          { new: true, runValidators: true }
        );
      }
    },
    removeBook: async (parent, {bookId}, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
      }
    },
  }
};

module.exports = resolvers;
