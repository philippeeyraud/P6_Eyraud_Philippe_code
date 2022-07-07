//Comment gerer les fichiers ou les enregistrer et quel nom leurs donner
const multer = require('multer');

//dictionaire
const MIME_TYPES = {
    'images/jpg': 'jpg',
    'images/jpeg': 'jpeg',
    'images/png': 'png'

};
//Création d'un objet de configuration pour multer(storage)
//L'objet de configuration a besoin de deux elements
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null,'images')
    },
    filename: (req, file, callback) => {
       const name = file.originalname.split('').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
        console.log(name)
    }
});

module.exports = multer({ storage}).single('image');