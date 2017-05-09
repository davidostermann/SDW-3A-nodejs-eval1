const express = require('express');
const {Router} = express;

const mongoose = require('mongoose');

const UserController = require('./controller/User');
const ProjectController = require('./controller/Project');
const RateController = require('./controller/Rate');

const bodyParser = require('body-parser');
const router = Router();

if(process.env.NODE_ENV == 'production') {
  mongoose.connect(`mongodb://${process.env.MLAB_DBUSER}:${process.env.MLAB_DBPASSWORD}@${process.env.MLAB_DBURL}`);
} else {
  mongoose.connect('mongodb://zackstrife:antoine2199@ds129281.mlab.com:29281/heroku_db');
}

router.use(bodyParser.json({'extended': true}));
router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.send('coucou api');
});

router.get('/users', UserController.getUsers);
router.get('/user/:id', UserController.getUser);
router.post('/user', UserController.createUser);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);

router.get('/projects', ProjectController.getProjects);
router.get('/project/:id', ProjectController.getProject);
router.post('/project', ProjectController.createProject);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.get('/user/:id/projects', ProjectController.getUserProjects);

// Noter un projet avec un userId (la date de la création de la note doit être sauvegardé) ok
router.post('/user/:userId/project/:projectId/rate/:rate', RateController.rateProject);
// Modifier une note ok
router.put('/user/:userId/rate/:rateId/edit/:rate', RateController.updateRate);
// Lister les projets avec la moyenne des notes et le nombre total de note pour chaque projet ok
router.get('/projects/rate', ProjectController.getProjectsRates);
// Récupérer, pour un utilisateur, tous les projets qu'un utilisateur a noté en précisant pour chaque projet la note attribuée, la date de création, la date de modification de la note
router.get('/user/:userId/projectsWithRate', ProjectController.getUserProjectsRated);
// Récupérer, pour un projet, tous les utilisateurs qui ont notés en précisant pour chaque utilisateur la note attribuée
router.get('/project/:projectId/usersWithRate', UserController.getProjectUsersRated);
// Supprimer une note
router.delete('/rate/:rateId', RateController.deleteRate);

module.exports = router;

// Un utilisateur ne peut donner qu'une seul note par projet OK
// Les notes vont de 1 à 10 OK
// La date de la création d'une note doit être sauvegardée OK
// La date de la modification d'une note doit être sauvegardée OK

// Les moyennes de note par projet doivent être présentée avec 2 décimales !!

