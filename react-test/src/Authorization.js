import React, {Component} from 'react';
import {gql, ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {ApolloProvider, Mutation} from 'react-apollo';
import {Redirect, useHistory} from "react-router-dom";


const LOGIN = gql`
    mutation signUp($name: String!, $password: String!) {
        signUp(name: $name, password: $password) {
            token
            user {
                id
                name
            }
        }
    }
`;
// const SIGN_UP = gql`
//     mutation login($name:String!,$password: String!) {
//         login(name:$name,password: $password) {
//             token
//         }
//     }
// `;

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:4000/graphql'
    }),
    cache: new InMemoryCache()
});

function AuthButton({signUpMutation,name,password,}) {
    let history = useHistory();
    return <button type="button"
                   className="btn btn-primary"
                   onClick={() => {
                       signUpMutation({
                           variables: {
                               name: name,
                               password: password
                           }
                       })
                           .then(res => {
                               console.log(
                                   '​LoginScreen -> res.data.login.token',
                                   res.data.signUp.token
                               );
                               localStorage.setItem('token', res.data.signUp.token);
                               history.push("/")
                           })
                           .catch(err => <p>{err}</p>);
                   }}
    >
        Войти
    </button>
}

class Authorization extends Component {
    state = {
        password: '',
        name: '',
    };

    render() {
        return (
            <ApolloProvider client={client}>
                <Mutation mutation={LOGIN}>
                    {(signUpMutation, {data}) => (
                        <form>
                            <div className="form-group">
                                <label htmlFor="login">Логин пользователя</label>
                                <input type="text"
                                       className="form-control"
                                       onChange={text => {
                                           this.setState({name: text.target.value})
                                       }}
                                       id="login"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password">Пароль</label>
                                <input type="password"
                                       onChange={text => {
                                           this.setState({password: text.target.value})
                                       }}
                                       className="form-control"
                                       id="Password"/>
                            </div>
                            <AuthButton signUpMutation={signUpMutation}
                            name={this.state.name}
                            password={this.state.password}/>
                        </form>

                    )}
                </Mutation>
            </ApolloProvider>
        )
    }
}

export default Authorization
