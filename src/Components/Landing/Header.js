import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import {Col, Row} from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Nunito',
        // marginTop:"10%",
    },
    appbar: {
        background: 'none',
        // marginTop:"10%",
    },
    appbarWrapper: {
        width: '80%',
        margin: '0 auto',
    },
    appbarTitle: {
        flexGrow: '1',
        color: '#fff',
    },
    icon: {
        color: '#fff',
        fontSize: '2rem',
    },
    colorText: {
        color: '#2eb862',
    },
    container: {
        textAlign: 'center',
    },
    title: {
        color: '#fff',
        fontSize: '3.0rem',
    },
    goDown: {
        color: '#5AFF3D',
        fontSize: '10rem',
        margin: 0
    },
}));
export default function Header() {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);
    return (
        <div className={classes.root} id="header">

            <Collapse
                in={checked}
                {...(checked ? { timeout: 200 } : {})}
                collapsedSize={30}>
                <div className={classes.container}>

                    <h3 className={classes.title}>
                        Welcome to <br />
                        REACT<span className={classes.colorText}>FITNESS.</span>
                    </h3>
                    <h3 className={classes.appbarTitle}>
                        The only <span className={classes.colorText}>Fitness <br />
                        APP</span> you need.
                    </h3>
                    <Scroll to="body" smooth={true}>
                        <IconButton>

                            <ExpandMoreIcon className={ ` ${classes.goDown} animation `} />

                        </IconButton>
                    </Scroll>
                </div>
            </Collapse>
        </div>
    );
}
