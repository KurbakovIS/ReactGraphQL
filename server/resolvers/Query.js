module.exports = {
    async allUsers(root, args, {models}) {
        return models.User.findAll()
    },
    async allComments(root, args, {models}) {
        return models.Comment.findAll()
    },
    async getComment(root, {id}, {models}) {
        return models.Comment.findAll({where:{BookId:id}})
    },
    async getCommentsBook(root, args, {models}) {
        return models.Comment.findAll({where:{BookId:args.id},limit: args.first, offset: args.start})
    },
    async getAuthor(root, {id}, {models}) {
        return models.Author.findByPk(id)
    },
    async getBook(root, {id}, {models}) {
        return models.Book.findByPk(id)
    },
    async getAllAuthors(root, args, {models}) {
        return models.Author.findAll()
    },
    async getAllBooks(root, args, {models}) {
        return models.Book.findAll()
    },

};
