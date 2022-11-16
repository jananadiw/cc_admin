# CanvasConfetti Admin
[![Package - react](https://img.shields.io/github/package-json/dependency-version/plutach/cc_admin/react?color=blue)](https://www.npmjs.com/package/react)

> A client application and an artwork uploader/admin project for www.canvasconfetti.com site, which uses a [server application](https://github.com/plutach/file-uploader-s3). 
This project uses ReactJs, Material UI and Axios.

## Features
- Uploads the artwork on AWS S3 bucket.
- Saves image information; s3 bucket object url, image caption etc on a database table.

## Set up instructions - [Server](https://github.com/plutach/file-uploader-s3)

> Setting up local server, database table is required before starting the client applicatio

```
Install project
npm i

Start the on local port 3001
npm start
```

## Set up instructions - Client
```
Start client on local port 3000
npm start

To build client
npm run build
```
