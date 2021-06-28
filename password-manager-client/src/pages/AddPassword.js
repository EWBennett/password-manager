import  React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import  PasswordForm  from '../components/PasswordForm';

export default class AddPassword extends Component {
    render () {
        return (<Paper>
            <PasswordForm elevation={3} />
        </Paper>)
    }
}