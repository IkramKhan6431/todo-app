import React from 'react';

class NotesList extends React.Component {

    render() {
        return (
            <div>
                Notes List {this.props.routeParams['id']}
            </div>
        )
    }
}

export default NotesList;