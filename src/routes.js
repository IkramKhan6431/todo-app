import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './Components/App';
import NotesList from './Components/NotesList';

export default (
    <Route path='/'>
        <IndexRoute component={App}/>
    </Route>
);