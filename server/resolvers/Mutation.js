const APP_SECRET = 'abcdefghijklmnopqrst';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = {
    async createAuthor(root, {first_name, last_name, bio}, {models}) {
        return models.Author.create({
            first_name,
            last_name,
            bio
        })
    },
    async createBook(root, {AuthorId, name, description, release_date}, {models}) {
        let newBook = await models.Book.create({name, description, release_date});
        let BookId = newBook.id;
        models.Author_Books.create({AuthorId, BookId});
        return newBook
    },
    async createUser(root, {name, password}, {models}) {
        return models.User.create({name, password})
    },
    async signUp(root, {name, password}, {models}) {
        const bcPassword = await bcrypt.hash(password, 10);
        const user = await models.User.create({name, password:bcPassword});
        const token = jwt.sign({userId: user.id}, APP_SECRET);
        return {
            token,
            user
        };
    },
    async login(root, {name, password}, {models}) {
        const user = await models.User.findOne({where: {name: name}});
        if (!user) {
            throw new Error('User not found')
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Sorry, Wrong password')
        }
        const token = jwt.sign({userID: user.id}, APP_SECRET);

        return {token, user}
    }
};
