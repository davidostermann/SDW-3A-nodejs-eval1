const Project = require('../model/Project');
const Grade = require('../model/Grade');

const ProjectController = {

  getProjects: (req, res) => {
    Project.find()
    .populate({
      path: '_creator',
      model: 'User'})
    .exec((err, projects) => {
      if (err) { res.send(err) }
      var notes = [];
      for (var i = 0; i < projects.length; i++) {
        Grade.find({
          '_project': projects[i]._id
        }, 'note', function(err, notes){
          if (err) {
            return res.send(err)
          }
          if (null != notes){
            var aNote = null;
            for (var u = 0; u < notes.length; u++) {
              aNote = (aNote + notes[u]) / 2;
            }
            projects['notes'] = aNote;
            console.log(projects);
          }
        });
      }
      res.json(projects);
    });
  },

  createProject: (req, res) => {
    var project = new Project();
    project.title = req.body.title;
    project.description = req.body.description;
    project._creator = req.body.creator;
    project.save((err) => {
      if (err) {
        return res.send(err);
      }

      res.json({
        message: `Project ${project._creator} created !`
      });
    });
  },

  getProject: (req, res) => {
    Project.findOne({_id: req.params.id})
    .exec((err, project) => {
      if (err) { res.send(err); }
      res.json(project);
    });
  },

  updateProject: (req, res) => {
    Project.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true}, (err, project) => {
      if (err) {
        return res.send(err).status(500);
      }
      res.json(project)
    });
  },

  deleteProject: (req, res) => {
    Project.findByIdAndRemove(req.params.id, (err, project) => {
      if (err) {
        return res.send(err).status(500);
      }
      let str = (project) ? `Project ${project._id} deleted !` : 'No project were deleted.'
      res.json({ message: str })
    });
  },

  getUserProjects: (req, res) => {
    Project.find({_creator: req.params.id})
    .exec((err, projects) => {
      if (err) { res.send(err); }
      res.json(projects);
    });
  }

};

module.exports = ProjectController;
