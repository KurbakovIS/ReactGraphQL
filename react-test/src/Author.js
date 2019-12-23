import React from 'react'
import {Query} from 'react-apollo'
import {ROOT_QUERY} from './App'
import {Link} from "react-router-dom";


const Authors = () =>
    <Query query={ROOT_QUERY}>
        {({data, loading}) => loading ?
            <p>загрука авторов...</p> :
            <AuthorList
                authors={data.getAllAuthors}/>
        }
    </Query>

const AuthorList = ({authors}) => {
    return (
        <div className="container">
            <h2>Авторы</h2>
            <table className="table table-sm">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Фамилия</th>
                    <th scope="col">Кол-во книг</th>
                    <th scope="col">Биография</th>
                    <th scope="col">Список книг</th>
                </tr>
                </thead>
                <tbody>
                {authors.map(author =>
                    <AuthorListItem key={author.id}
                                    id={author.id}
                                    first_name={author.first_name}
                                    last_name={author.last_name}
                                    bio={author.bio}
                                    countBook={author.book.length}
                                    books={author.book}
                    />
                )}
                </tbody>
            </table>
        </div>

    )
};

const AuthorListItem = ({id, first_name, last_name, bio, countBook, books}) =>
    <tr>
        <td>
            <Link to={`/AuthorBio/${id}`}>{first_name}</Link>
        </td>
        <td>{last_name}</td>
        <td>{bio}</td>
        <td>{countBook}</td>
        <td>
            <ul>
                {books.map(book =>
                    <li key={book.id}>
                        {book.name}
                    </li>
                )}
            </ul>
        </td>
    </tr>;


export default Authors
