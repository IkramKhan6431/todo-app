import React from 'react';
import { ListGroupItem, Row, Col } from 'react-bootstrap';
import {
    IconMenu, MenuItem, IconButton, MuiThemeProvider,
    Checkbox
} from 'material-ui';
import EditPostModal from './AddPostModal';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/image/edit';
import Unchecked from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import Checked from 'material-ui/svg-icons/toggle/check-box';

class TodoListItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showEditPostModal: false,
        }

        this.editTodoItem = this.editTodoItem.bind(this);
        this.showEditPostModal = this.showEditPostModal.bind(this);
        this.hideEditPostModal = this.hideEditPostModal.bind(this);
    }

    editTodoItem() {
        if(this.props.addTodoItem(this.props.newPost)) {
            this.hideEditPostModal();
        }
    }

    showEditPostModal() {
        this.setState({
            showEditPostModal: true,
        });
        this.props.setNewPost(this.props.post.id)
    }

    hideEditPostModal() {
        this.setState({
            showEditPostModal: false,
        });
        this.props.clearPostData();
    }

    render() {
        const { post, newPost, errorMessages } = this.props;
        const blueColor = '#4676e0';
        return (
            <div>
                {
                    <ListGroupItem onClick={ this.props.showItemDetails }>
                        <Row>
                            <Col sm={8}>
                                <Row>
                                    <Col sm={1} className="check-box">
                                        <MuiThemeProvider>
                                            <Checkbox iconStyle={ {fill: blueColor} }
                                                      checkedIcon={<Checked />}
                                                      uncheckedIcon={<Unchecked />}
                                                      onClick={ (event) => this.props.togglePostDoneStatus(post.id) }
                                                      checked={ post['done'] } />
                                        </MuiThemeProvider>
                                    </Col>
                                    <Col sm={11}>
                                        <Row>
                                            <h4 className="col-sm-12 list-group-item-heading">
                                                { post['title'] }
                                            </h4>
                                        </Row>
                                        <Row>
                                            <p className="col-sm-12 list-group-item-text">
                                                { post['details'] }
                                            </p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={4} className="text-right">
                                <MuiThemeProvider>
                                    <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                              anchorOrigin={ {horizontal: 'right', vertical: 'bottom'} }
                                              targetOrigin={ {horizontal: 'right', vertical: 'top'} } >
                                        <MenuItem onClick={ this.showEditPostModal } 
                                                  primaryText="Edit"
                                                  leftIcon={ <Edit /> } />
                                        <MenuItem onClick={ (event) => this.props.removeTodoItem(post.id) }
                                                  primaryText="Remove"
                                                  leftIcon={ <Delete /> } />
                                    </IconMenu>
                                </MuiThemeProvider>
                            </Col>
                        </Row>
                        <EditPostModal show={ this.state.showEditPostModal }
                                       handleClose={ this.hideEditPostModal }
                                       newPost={ newPost }
                                       blueColor={ blueColor }
                                       errorMessages={ errorMessages }
                                       addTodoItem={ this.editTodoItem }
                                       handlePostChange={ this.props.handlePostChange }/>
                    </ListGroupItem>
                }
            </div>
        )
    }
}

export default TodoListItem;