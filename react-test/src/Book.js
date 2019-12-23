import React from 'react'
import {Query} from 'react-apollo'
import {BOOK_QUERY} from './App'
import Comments from './Comments'
import {
    Link,
    useParams
} from "react-router-dom";


const Book = () => {
    let {id} = useParams();
    id = parseInt(id);

    return (
        <Query query={BOOK_QUERY}
               variables={{id: id}}>
            {({data, loading, error}) => {
                if (error) return <p>Error: ${error.message}</p>;
                if (loading) {
                    return <p>загрука книги...</p>;
                } else {
                    return <BookItem
                        id={id}
                        book={data.getBook}
                    />
                }
            }
            }
        </Query>
    )
};

const BookItem = ({book, id}) => {
    return (
        <div className="container">
            <Link to='/'>Вернуться на главную</Link>
            <h2>Книга {book.name}</h2>
            <table className="table table-sm">
                <thead>
                <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Авторы книги</th>
                    <th scope="col">Краткое описание книги</th>
                    <th scope="col">Дата выхода книги</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{book.name}</td>
                    {book.author.map(item =>
                        <AuthorListItem key={item.id}
                                        id={item.id}
                                        first_name={item.first_name}
                        />
                    )}
                    <td>{book.description}</td>
                    <td>{book.release_date}</td>
                </tr>
                </tbody>
            </table>
            <h4>Комментарии</h4>
            <Comments id={id}/>
        </div>
    )
};


const AuthorListItem = ({id, first_name}) =>

    <td>
        <Link to={`/AuthorBio/${id}`}>{first_name}</Link>
    </td>;

export default Book
