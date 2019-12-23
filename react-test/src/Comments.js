import React from 'react'
import {Query} from 'react-apollo'
import {COMMENTS_QUERY} from './App'

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            first: 3,
            start: 0,
        };
    }
    render() {
        const Comment = () => {
            return (
                <Query query={COMMENTS_QUERY}
                       variables={{id: this.state.id, first: this.state.first, start: this.state.start}}>
                    {({data, loading, error, fetchMore}) => {
                        if (error) return <p>Error: ${error.message}</p>;
                        if (loading) {
                            return <p>загрука комментариев...</p>;
                        } else {
                            return <CommentsItem
                                fetchMore={fetchMore}
                                comments={data.getCommentsBook}
                            />
                        }
                    }
                    }
                </Query>
            )
        };
        const CommentsItem = ({comments, fetchMore}) => {
            return (
                <div>
                    {
                        comments.length
                            ? <ul>
                                {comments.map(item =>
                                    <li key={item.id}
                                        id={item.id}
                                    >
                                        {item.text}
                                    </li>
                                )}
                            </ul>
                            : <ul/>
                    }
                    {
                        comments.length
                            ? <button type="button"
                                      className="btn btn-primary btn-sm mr-3"
                                      onClick={() => {
                                this.setState({
                                    start: this.state.start + 3
                                })
                            }
                            }>
                                Следующая страница
                            </button>
                            : <template/>
                    }
                    <button type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                        let start = this.state.start - 3;
                        if (start <= 0) {
                            start = 0
                        }
                        this.setState({
                            start: start
                        })
                    }
                    }>
                        Предыдущая страница
                    </button>
                </div>
            )
        };


        return <Comment/>;
    }
}

export default Comments
