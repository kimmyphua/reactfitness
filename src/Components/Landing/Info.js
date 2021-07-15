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
        fontSize: '4rem',
    },
}));
export default function Info() {
    const classes = useStyles();
    const checked = useWindowPosition('body');
    return (
        <div className={classes.root} id="info">
            <Collapse
                in={checked}
                {...(checked ? { timeout: 200 } : {})}
                collapsedHeight={50}>
                <Row>
                    <Col md={6}>
                        <ImageCard place={places[2]} checked={checked} />
                    </Col>
                    <Col md={6}>
                        <ImageCard place={places[3]} checked={checked} />
                    </Col>
                </Row>
                {/*<Scroll to="info" smooth={true}>*/}
                {/*    <IconButton>*/}
                {/*        <ExpandMoreIcon className={classes.goDown} />*/}
                {/*    </IconButton>*/}
                {/*</Scroll>*/}
            </Collapse>
        </div>
    );
}
