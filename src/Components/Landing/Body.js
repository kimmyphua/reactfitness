import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from './ImageCard';
import places from './pics';
import useWindowPosition from './useWindowPosition';
import {IconButton,Collapse} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Link as Scroll} from "react-scroll";
import {Col, Row} from "react-bootstrap";
const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        overflow:"scroll",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'row',
        },
    },
    goDown: {
        color: '#5AFF3D',
        fontSize: '8rem',
    },
}));
export default function Body({auth, user,setUser}) {
    const classes = useStyles();
    const checked = useWindowPosition('header');
    return (
        <div className={classes.root} id="body">
            <Collapse
                in={checked}
                {...(checked ? { timeout: 500 } : {})}
                collapsedHeight={50}>
                <Row>
                    <Col md={6}>
            <ImageCard
                place={places[1]}
                checked={checked}
            />
                    </Col>
                    <Col md={6}>
            <ImageCard place={places[0]} checked={checked}/>
                    </Col>
                </Row>
            <Scroll to="info" smooth={true}>

                <IconButton>
                    <ExpandMoreIcon className={ ` ${classes.goDown} animation `} />
                </IconButton>
            </Scroll>
            </Collapse>
        </div>
    );
}
