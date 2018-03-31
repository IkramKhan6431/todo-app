import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import {
    RaisedButton, FlatButton,
    MuiThemeProvider, AppBar,
    IconButton, TextField
} from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class AddPostModal extends React.Component {

    render() {
        const { newPost, blueColor, errorMessages } = this.props;

        const titleErrorMessage = _.find(errorMessages, { property: 'title' });
        const detailsErrorMessage = _.find(errorMessages, { property: 'details' });

        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <MuiThemeProvider>
                    <AppBar
                        style={ {backgroundColor: blueColor} }
                        title={ this.props.title }
                        iconElementLeft={
                            <IconButton>
                                <NavigationClose onClick={ this.props.handleClose } />
                            </IconButton>
                        }
                    />
                </MuiThemeProvider>
                <Modal.Body>
                    <MuiThemeProvider>
                        <div>
                            <Row>
                                <Col sm={12}>
                                    <TextField  floatingLabelText="Title"
                                                fullWidth={ true }
                                                value={ newPost['title'] }
                                                errorText={ titleErrorMessage ? titleErrorMessage['message'] : null }
                                                onChange={ event => this.props.handlePostChange(event, 'title') }
                                                underlineFocusStyle={ {borderBottomColor: blueColor} }
                                                maxLength="100"
                                                floatingLabelShrinkStyle={ {color: blueColor} } />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <TextField  floatingLabelText="Details"
                                                fullWidth={ true }
                                                value={ newPost['details'] }
                                                errorText={ detailsErrorMessage ? detailsErrorMessage['message'] : null }
                                                onChange={ event => this.props.handlePostChange(event, 'details') }
                                                underlineFocusStyle={ {borderBottomColor: blueColor} }
                                                maxLength="1000"
                                                floatingLabelShrinkStyle={ {color: blueColor} } />
                                </Col>
                            </Row>
                        </div>
                    </MuiThemeProvider>
                </Modal.Body>

                <Modal.Footer>
                    <MuiThemeProvider>
                        <Row>
                            <Col sm={12}>
                                <RaisedButton backgroundColor={ blueColor }
                                              labelColor="#ffffff"
                                              label="Save Item"
                                              onClick={ (event) => this.props.addTodoItem() } />
                                <FlatButton onClick={this.props.handleClose} label="Close" />
                            </Col>
                        </Row>
                    </MuiThemeProvider>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddPostModal;