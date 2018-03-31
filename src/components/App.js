import React from 'react';
import TodoList from './TodoList';
import _ from 'lodash';
import { BounceLoader } from 'halogenium'
import { FloatingActionButton, MuiThemeProvider, Snackbar } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddPostModal from './AddPostModal';
import Header from './Header';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            loading: false,
            showAddPostModal: false,
            newPost: {
                id: 0,
                title: '',
                details: '',
                done: false
            },
            errorMessages: [
                {
                    property: '',
                    message: ''
                },
            ],
            showSnackbar: false,
            snackbarMessage: '',
            lastRemovedPost: null,
            snackbarHideDuration: 2000
        }

        this.showAddPostModal = this.showAddPostModal.bind(this);
        this.hideAddPostModal = this.hideAddPostModal.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);
        this.addTodoItem = this.addTodoItem.bind(this);
        this.removeTodoItem = this.removeTodoItem.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
        this.handleUndoItem = this.handleUndoItem.bind(this);
        this.setNewPost = this.setNewPost.bind(this);
        this.clearPostData = this.clearPostData.bind(this);
        this.togglePostDoneStatus = this.togglePostDoneStatus.bind(this);
    }

    componentWillMount() {
        this.retrieveTodoList();
    }

    retrieveTodoList() {
        let posts = [];
        this.setState({
            loading: true
        });
        if(!_.isEmpty(localStorage.getItem('posts'))) {
            posts = JSON.parse(localStorage.getItem('posts'));
        }
        this.setState({
            posts,
            loading:false
        });
    }

    showAddPostModal() {
        this.setState({
            showAddPostModal: true
        });
    }

    hideAddPostModal() {
        this.setState({
            showAddPostModal: false,
            errorMessages: [],
            newPost: {
                id: 0,
                title: '',
                details: '',
                done: false
            }
        });
    }

    setNewPost(postId) {
        this.setState({
            newPost: _.find(this.state.posts, { id: postId })
        });
    }

    clearPostData() {
        this.setState({
            errorMessages: [],
            newPost: {
                id: 0,
                title: '',
                details: '',
                done: false
            }
        });
    }

    handlePostChange(event, property) {
        let newPost = _.cloneDeep(this.state.newPost);
        newPost[property] = event.target.value;

        let errorMessages = _.cloneDeep(this.state.errorMessages);
        if(!_.isEmpty(event.target.value)) {
            _.remove(errorMessages, { property: property });
        }

        this.setState({ newPost, errorMessages });
    }

    validatePost(post) {
        let errorMessages = [];
        let validated = true;

        if(_.isEmpty(post['title'])) {
            errorMessages.push({
                property: 'title',
                message: 'Title required'
            });
            validated = false;
        }
        if(_.isEmpty(post['details'])) {
            errorMessages.push({
                property: 'details',
                message: 'Details required'
            });
            validated = false;
        }

        this.setState({ errorMessages });
        return validated;
    }

    addTodoItem(post) {
        let newPost = _.cloneDeep(this.state.newPost);
        if (post) {
            newPost = post;
        }
        const isPostValid = this.validatePost(newPost);
        if(isPostValid) {
            let snackbarMessage = "Item added to list";
            let posts = !_.isEmpty(localStorage.getItem('posts')) ? JSON.parse(localStorage.getItem('posts')) : [];
            if(!newPost['id'])
            {
                let id = 1;
                if(localStorage.getItem('id')) {
                    id = parseInt(localStorage.getItem('id'), 10);
                }
                newPost['id'] = id;
                newPost['done'] = false;
                localStorage.setItem('id', newPost['id'] + 1);
            }
            else {
                _.remove(posts, { id: newPost.id });
                snackbarMessage = "Changes saved";
            }
            this.setState({
                loading: true
            });
            const index = _.sortedIndexBy(posts, newPost, 'id');
            posts.splice(index, 0, newPost);
            localStorage.setItem('posts', JSON.stringify(posts));

            this.setState({
                posts,
                newPost: {
                    id: 0,
                    title: '',
                    details: '',
                    done: false
                },
                lastRemovedPost: null,
                loading:false,
                showSnackbar: true,
                snackbarMessage,
                snackbarHideDuration: 2000,
            });
            this.hideAddPostModal();
            return true;
        }
        return false;
    }

    removeTodoItem(postId) {
        this.setState({ loading: true });
        let posts = _.cloneDeep(this.state.posts);
        let post = _.remove(posts, { id: postId });

        localStorage.setItem('posts', JSON.stringify(posts));
        this.setState({
            posts,
            loading:false,
            showSnackbar: true,
            snackbarMessage: "Item removed from list",
            snackbarHideDuration: 4000,
            lastRemovedPost: post.shift()
        });
    }

    handleUndoItem() {
        if (this.state.lastRemovedPost) {
            this.addTodoItem(this.state.lastRemovedPost);
        }
    }

    closeSnackbar() {
        this.setState({
            showSnackbar: false,
        });
    }

    togglePostDoneStatus(postId) {
        let posts = _.cloneDeep(this.state.posts);
        let selectedPost = _.find(posts, { id: postId });
        selectedPost['done'] = !selectedPost['done'];
        let snackbarMessage = '';
        if(selectedPost['done']) {
            snackbarMessage = 'Marked as done';
        }
        else {
            snackbarMessage = 'Marked as undone';
        }

        this.setState({
            posts,
            showSnackbar: true,
            snackbarMessage,
            snackbarHideDuration: 1000
        });
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    render() {
        const blueColor = '#4676e0';
        return (
            <div>
                { this.state.loading ? <div className="loading-component"><BounceLoader color={ blueColor }/></div> : null }
                <Header />
                <div className="container" sm={6}>
                    <TodoList posts={ this.state.posts }
                              errorMessages={ this.state.errorMessages }
                              newPost={ this.state.newPost }
                              handlePostChange={ this.handlePostChange }
                              addTodoItem={ this.addTodoItem }
                              setNewPost={ this.setNewPost }
                              clearPostData={ this.clearPostData }
                              togglePostDoneStatus={ this.togglePostDoneStatus }
                              removeTodoItem={ this.removeTodoItem } />
                </div>
                <MuiThemeProvider>
                    <FloatingActionButton backgroundColor={ blueColor }
                                          onClick={ this.showAddPostModal }
                                          className="add-post-btn">
                        <ContentAdd />
                    </FloatingActionButton>
                </MuiThemeProvider>
                <AddPostModal show={ this.state.showAddPostModal }
                              handleClose={ this.hideAddPostModal }
                              newPost={ this.state.newPost }
                              blueColor={ blueColor }
                              errorMessages={ this.state.errorMessages }
                              addTodoItem={ this.addTodoItem }
                              handlePostChange={ this.handlePostChange } 
                              title="Add todo item" />
                <MuiThemeProvider>
                    <Snackbar open={ this.state.showSnackbar }
                              message={ this.state.snackbarMessage }
                              action={ this.state.lastRemovedPost ? "undo" : null}
                              onActionClick={ this.handleUndoItem }
                              autoHideDuration={ this.state.snackbarHideDuration }
                              onRequestClose={ this.closeSnackbar } />
                </MuiThemeProvider>
            </div>
        )
    }
}

export default App;