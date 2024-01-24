import express from "express";
import multer from "multer";


const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, './uploads');
    },
    filename: (request, file, cb) => {
        cb(null, file.originalname);    
    }
})

const configuredMulter = multer({
    storage,
});

const application = express();

application.use('/static', express.static(__dirname + '/uploads'));

application.get('/images', (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

// On utilise single quand la route s'attend à recevoir qu'un seul fichier
application.post('/upload_file', configuredMulter.single('my_super_file'), (request, response) => {
    console.log(request.file);
    console.log(request.body);
    response.redirect('/static/'+ request.file?.originalname);
});

application.listen(8001, () => {
    console.log('Argh, nous allons uploader des fichiers');
})