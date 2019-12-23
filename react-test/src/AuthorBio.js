import React from 'react'
import {Query} from 'react-apollo'
import {AUTHOR_QUERY} from "./App";
import {
    Link,
    useParams
} from "react-router-dom";

const Author = () => {
    let {id} = useParams();
    id = parseInt(id);
    return (
        <Query query={AUTHOR_QUERY}
               variables={{id: id}}>
            {({data, loading}) => loading ?
                <p>загрука автора...</p> :
                <AuthorItem
                    author={data.getAuthor}/>
            }
        </Query>
    )
};


const AuthorItem = ({author}) =>
    <div className="container">
        <Link to='/'>Вернуться на главную</Link>
        <h2 className="mt-3">Автор {author.first_name}</h2>
        <ul className="list-group list-group-flush mb-5">
            <li className="list-group-item">Имя - {author.first_name}</li>
            <li className="list-group-item">Фамилия - {author.last_name}</li>
            <li className="list-group-item">Биография - {author.bio}</li>
        </ul>
            <h4>Книги автора</h4>
            <table className="table table-sm">
                <thead>
                <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Дата выпуска</th>
                </tr>
                </thead>

                <tbody>
                {author.book.map(item =>
                    <BookListItem key={item.id}
                                  id={item.id}
                                  name={item.name}
                                  release_date={item.release_date}
                    />
                )}
                </tbody>
            </table>

    </div>;


const BookListItem = ({id, name, release_date}) =>
    <tr>
        <td>
            <Link to={`/Book/${id}`}>{name}</Link>
        </td>
        <td>{release_date}</td>
    </tr>;

export default Author
