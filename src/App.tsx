import React from 'react';
import UploadForm from './upload-form/upload-form';
import './App.css';

function App() {
    return (
        <div className='App'>
            <header className='App-header'>{<UploadForm />}</header>
        </div>
    );
}

export default App;
