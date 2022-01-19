import React from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./login.css";

import {useNavigate} from "react-router-dom";


export default function Login() {

    const navigate = useNavigate();

    return (

        <body>
        Metamars 2022

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
                    <Button variant="outlined" onClick={() => {
                        navigate('/app');
                    }}> Логин</Button>
                </Stack>
            </form>
        </div>
        </body>
    );
}