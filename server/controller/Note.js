const Note = require('../model/Note');

const NoteController = {

  createNote: (req, res) => {
    var note = new Note();
    note.title = req.body.note;
    note.description = req.body.created_at;
    note._creator = req.body.creator;
    note._project = req.body.project;
    note.save((err) => {
      if (err) {
        return res.send(err);
      }

      res.json({
        message: `Note ${note._creator} created !`
      });
    });
  },

  updateNote: (req, res) => {
    Note.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true}, (err, note) => {
      if (err) {
        return res.send(err).status(500);
      }
      res.json(note)
    });
  },

  deleteNote: (req, res) => {
    Note.findByIdAndRemove(req.params.id, (err, note) => {
      if (err) {
        return res.send(err).status(500);
      }
      let str = (note) ? `Note ${note._id} deleted !` : 'No note was deleted.'
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

module.exports = NoteController;
