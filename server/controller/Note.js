const NoteModel = require('../model/Note');

const NoteController = {

  addNote: (req, res) => {
    const note = new NoteModel()
    // Si l'utilisateur à déjà posté une note, on lui renvoie la note déjà donnée
    NoteModel.find({
      '_creator': req.body.creator,
      '_project': req.body.project
    }, 'note', function(err, innerNote){
      if (err) {
        return res.send(err)
      }
      if (null != innerNote){
        return res.send(innerNote)
      } else {
        // Si la note n'est pas comprise entre 1 et 10, on renvoie une erreur
        if (req.body.note > 10 || req.body.note < 1){
          return res.send({'error': 'note must be between 1 and 10'})
        }

        note._creator = req.body.creator;
        note._project = req.body.project;
        note.note = req.body.note;
        note.dateCreated = new Date();
        note.save((err, user) => {
          if (err) {
            return res.send(err)
          }
          res.json(note)
        })
      }
    })
  },

  editNote: (req, res) => {
    NoteModel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true}, (err, note) => {
      note.dateModified = new Date();
      note.save((err, user) => {
        if (err) {
            return res.send(err)
          }
          res.json(note)
      })
    });
  },

  deleteNote: (req, res) => {
    NoteModel.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        return res.send(err).status(500);
      }
      res.json({ message: 'Note deleted!' })
    });
  }

}

module.exports = NoteController;
