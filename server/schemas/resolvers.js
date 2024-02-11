const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, { userId }) => {
      return await User.findOne({ _id: userId});
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
    // TODO: the functions below need a user identifier, in the original code it comes from a middleware when the token gets passed through the original API call
    // do i just take the token as another param and then grab the user from that? can i just do that here?
    saveBook: async (parent, body) => {
      return await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
    },
    removeBook: async (parent, {bookId}) => {
      return await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
    },
  }
};

module.exports = resolvers;
