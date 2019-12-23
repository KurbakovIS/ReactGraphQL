import React from 'react'
import Authors from './Author'
import AuthorBio from "./AuthorBio";
import Book from "./Book";
import Authorization from "./Authorization";

import {gql} from 'apollo-boost'
import {
    Switch,
    Route, Redirect
} from "react-router-dom";


export const ROOT_QUERY = gql`
    query getAllAuthors {
        getAllAuthors {
            id
            first_name
            last_name
            bio
            book{
                id
                name
            }
        }
    }
`
export const AUTHOR_QUERY = gql`
    query getAuthor ($id:Int!){
        getAuthor(id: $id){
            id
            first_name
            last_name
            bio
            book{
                id
                name
                description
                release_date
            }
        }
    }
`
export const BOOK_QUERY = gql`
    query getBook ($id:Int!){
        getBook(id: $id){
            id
            name
            description
            release_date
            totalComment
            author{
                id
                first_name
            }
        }
    }
`

export const COMMENTS_QUERY = gql`
    query getCommentsBook ($id:Int!,$first:Int!,$start:Int!){
        getCommentsBook(id: $id, first: $first,start:$start){
            id
            text
        }
    }
`

function PrivateRoute({children, ...rest}) {
    return (
        <Route
            {...rest}
            render={({location}) =>
                localStorage.getItem('token') ? (
                    children
                ) : (
                    <Redirect
                        to={'/login'}
                    />
                )
            }
        />
    );
}

const App = () => {
    return (
        <div className="container">
            <Switch>
                <Route path="/login">
                    <Authorization/>
                </Route>
                <PrivateRoute path="/AuthorBio/:id">
                    <AuthorBio/>
                </PrivateRoute>
                <PrivateRoute path="/Book/:id">
                    <Book/>
                </PrivateRoute>
                <PrivateRoute path="/">
                    <Authors/>
                </PrivateRoute>
            </Switch>
        </div>
    )
}
export default App
