import React from 'react';
import {Route, ReactLocation} from 'react-location';
import Login from './features/login/login';
import {LawCalculator} from './features/lawcalculator/LawCalculator';
import Home from './features/Home';

export const routes: Route[] = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: 'login',
        element: <Login/>,
    },
    {
        path: 'calculator',
        element: <LawCalculator/>,
    },
];


export const location = new ReactLocation();