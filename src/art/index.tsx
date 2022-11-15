import React, { useState, useEffect, ReactElement } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: '10px 0',
            maxWidth: 560,
        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
    }),
);

function Art(): any {
    const classes = useStyles();
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        getAllImages();
    }, []);

    const getAllImages = () => {
        axios
            .get('http://localhost:3001/images')
            .then((res) => {
                const allImages = res.data;
                setData(allImages);
                console.log('images', res.data);
            })
            .catch((error) => {
                console.error(`Error: ${error}`);
            });
    };

    if (data.length > 0) {
        return data.map((item: any) => {
            return (
                <div className={classes.root} key={item.id}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt='complex' src={item.url} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction='column' spacing={2}>
                                    <Grid item xs>
                                        <Typography variant='body2' color='textSecondary' text-align='right'>
                                            Caption: {item.caption}
                                        </Typography>
                                        <Typography variant='body2' color='textSecondary'>
                                            ID: {item.id}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='body2' style={{ cursor: 'pointer' }}>
                                            Remove
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            );
        });
    }
}

export default Art;
