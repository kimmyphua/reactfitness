import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from "./Header";
import Body from "./Body"
import Info from "./Info";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        overflow:"scroll",
        backgroundImage: `url(${'https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Z3ltfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'})`,
        backgroundColor: "rgba(2,2,2,0.6)",
        backgroundBlendMode: "darken",
        backgroundRepeat: "repeat-y",
        backgroundSize: 'cover',
    },
}));
export default function LandingPage({user, setUser,auth}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header />
            <Body/>
            <Info />
        </div>
    );
}
