const {GraphQLScalarType} = require('graphql')

module.exports = {
    Book: {
        async author(root, args, {models}) {
            return await root.getAuthors()
        },
        async comment(root, args, {models}) {
            return await root.getComments({limit: args.first, offset: args.start})
        },
        async totalComment(root, args, {models}) {
            let comment = await root.getComments({limit: args.first, offset: args.start})
            return comment.length
        }
    },
    Author: {
        book: async (root, args, {models}) => {
            return await root.getBooks()
        }
    },
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'A valid date time value.',
        parseValue: value => new Date(value),
        serialize: value => new Date(value).toISOString(),
        parseLiteral: ast => ast.value
    })
}
