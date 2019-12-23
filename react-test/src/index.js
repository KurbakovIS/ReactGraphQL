import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import { BrowserRouter } from "react-router-dom";

const client = new ApolloClient({ uri:
        'http://localhost:4000/graphql' })
render(
    <ApolloProvider client={client}>
        <BrowserRouter>
        <App />
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
)
