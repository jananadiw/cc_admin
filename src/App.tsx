import React from 'react';
import UploadForm from './upload-form/upload-form';
import Art from './art';
import './App.css';

function App() {
    return (
        <div className='App'>
            <header className='App-header'>
                <div>
                    <UploadForm />
                    <Art />
                </div>
            </header>
        </div>
    );
}

export default App;
