import React from 'react';
import TodoListItem from './TodoListItem';
import { ListGroup } from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import _ from 'lodash';

class TodoList extends React.Component {

    constructor(props) {
        super(props);

        this.renderListItem = this.renderListItem.bind(this);
    }

    renderListItem(post) {
        return <TodoListItem removeTodoItem={ this.props.removeTodoItem }
                             errorMessages={ this.props.errorMessages }
                             newPost={ this.props.newPost }
                             handlePostChange={ this.props.handlePostChange }
                             addTodoItem={ this.props.addTodoItem }
                             setNewPost={ this.props.setNewPost }
                             clearPostData={ this.props.clearPostData }
                             togglePostDoneStatus={ this.props.togglePostDoneStatus }
                             key={post.id}
                             post={post} />
    }

    render() {
        if(!_.isEmpty(this.props.posts)) {
            return (
                <ListGroup>
                    <FlipMove duration={300}>
                        {
                            this.props.posts.map(this.renderListItem)
                        }
                    </FlipMove>
                </ListGroup>
            )
        }
        else {
            return (
                <h4> Todo list empty </h4>
            )
        }
    }
}

export default TodoList;