import React, { useState } from 'react';
import { Alert, TextField, Box, FormControl, Grid, Stack, Button, CircularProgress } from '@mui/material/';
import { green } from '@mui/material/colors';
// import LoadingButton from '@mui/lab/LoadingButton';
// import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import './upload-form.css';

function UploadForm() {
    // const Input = styled('input')({
    //   display: 'none',
    // });

    // local variables
    // TODO: use form state?
    const [file, setFile] = useState<FileList | null>(null);
    const [caption, setCaption] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [loading, setLoading] = React.useState(false);

    const fileObject = {
        url: '',
        caption: '',
        file: null,
    };

    // types
    type InputEvent = React.ChangeEvent<HTMLInputElement>;

    // helper functions
    const isUploading = () => !file || !caption;
    function clearForm() {
        setAlert(false);
        setFile(null);
        setCaption('');
    }

    const alertSuccess = () => {
        setAlert(true);
        setAlertContent('Successfully uploaded and saved');
    };

    const alertError = () => {
        setAlert(true);
        setAlertContent('Error occurred');
    };

    // handle caption for artwork
    const handleCaption = (e: InputEvent) => {
        setCaption(e.target.value);
    };

    // handle artwork file
    const handleFile = (e: InputEvent) => {
        setFile(e.target.files);
    };

    const saveArtworkInS3 = async (event: InputEvent) => {
        event.preventDefault();
        const formData = new FormData();
        try {
            if (!file) {
                throw new Error('Select a file first!');
            }
            formData.append('upload', file[0]);
            const response = await axios({
                method: 'POST',
                data: formData,
                url: 'http://localhost:3001/fileupload',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fileObject.url = response.data;
            fileObject.caption = caption;
        } catch (error) {
            alertError();
        }
    };

    const saveArtworkInDB = async (event: InputEvent) => {
        event.preventDefault();
        // const formData = fileObject;
        try {
            if (!file) {
                throw new Error('Select a file first!');
            }
            await axios({
                method: 'POST',
                data: {
                    url: fileObject.url,
                    caption: fileObject.caption,
                },
                url: 'http://localhost:3001/images',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            alertError();
        }
    };

    const uploadArtwork = (event: InputEvent) => {
        setLoading(true);
        saveArtworkInS3(event);
        setTimeout(() => {
            saveArtworkInDB(event);
            alertSuccess();
            setLoading(false);
            // clearForm();
        }, 2000);
    };

    return (
        <div className='App'>
            <header className='App-header'>
                {alertContent === 'Error occurred'
                    ? alert && <Alert severity='error'>{alertContent}</Alert>
                    : alert && <Alert severity='success'>{alertContent}</Alert>}
                <Box component='form' onSubmit={uploadArtwork} maxWidth='lg' sx={{ height: 700 }}>
                    <p>Upload artwork here 👇🏼</p>
                    <FormControl component='fieldset' id='form'>
                        <Grid container spacing={2}>
                            <Grid item xs={12} component='span'>
                                <Stack direction='row' alignItems='center' spacing={2}>
                                    <label htmlFor='contained-button-file'>
                                        <input
                                            accept='image/*'
                                            id='contained-button-file'
                                            type='file'
                                            onChange={handleFile}
                                        />
                                    </label>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={caption}
                                    id='outlined-basic'
                                    label='Caption'
                                    variant='outlined'
                                    fullWidth
                                    onChange={handleCaption}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type='submit'
                                    variant='contained'
                                    disabled={isUploading() || loading}
                                    // onClick={handleClick}
                                >
                                    Save
                                    {loading && (
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                                color: green[500],
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                marginTop: '-12px',
                                                marginLeft: '-12px',
                                            }}
                                        />
                                    )}
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Box>
            </header>
        </div>
    );
}

export default UploadForm;
