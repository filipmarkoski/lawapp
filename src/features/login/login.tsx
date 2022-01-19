import React from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./login.css";

import {Link} from 'react-location';

export default function Login() {

    return (

        <div className="loginapp">
            <form className="form">
                <TextField
                    label="Емаил"
                    id="email"
                    type="text"
                />
                <br/>

                <TextField
                    label="Лозинка"
                    id="password"
                    type="password"
                />
                <br/>

                <Stack spacing={2} direction="row">
                    <Button variant="text">Нов корисник?</Button>
                    <Button variant="text">Заборавена лозинка?</Button>
                    <Link to={'/'}>
                        <Button variant="outlined"
                        > Логин</Button>
                    </Link>


                </Stack>
            </form>
        </div>
    );
}