const Note = require('../model/Note');
const User = require('../model/User');

const NoteController = {
  /**
   * Delete project from mongoose from the iD
   * @param {any} req
   * @param {any} res
   */
  deleteNote: (req, res) => {
    Note.findByIdAndRemove(req.params.noteId, (err, note) => {
      if (err) {
        return res.send(err).status(500);
      }
      const str = (note) ? `Note ${note._id} deleted !` : 'No note were deleted.'
      res.send(str);
    });
  },

  /**
   * Get all note from the project id
   * @param {any} req
   * @param {any} res
   */
  getNoteFromProject: (req, res) => {
    Note.find({ _project: req.params.id })
      .populate({
        path: '_creator',
        model: 'User'
      })
      .exec((err, notes) => {
        if (err) {
          return res.send(err).status(500);
        }
        res.json(notes);
      });
  },

  /**
   * Create new note for the user set in headers
   * The note is given to the project id in the route
   * @param {any} req
   * @param {any} res
   */
  createNote: (req, res) => {
    User.findOne({ _id: req.headers._id })
      .exec((err, user) => {
        if (err) {
          return res.send('Please auth yourself').status(500);
        }
        if (!req.body.note || req.body.note > 10 || req.body.note < 0) {
          return res.send(`Please insert a valid note`).status(500);
        }
        Note.findOne({ _project: req.params.id, _creator: user._id })
          .exec((err, oldNote) => {
            if (err) {
              return res.send.status(500);
            }
            if (oldNote) {
              return res.send('A user can\'t have two notes on one project').status(500);
            }
            let note = new Note();
            note.note = req.body.note;
            note._creator = user._id;
            note._project = req.params.id;
            note.creationDate = Date.now();
            note.save((err, newNote) => {
              if (err) {
                return res.send(err);
              }
              res.json({
                message: `Note ${newNote.id} created !`
              });
            });
          });
      });
  },

  /**
   * Update note from noteId and projectId
   * @param {any} req
   * @param {any} res
   */
  updateNote: (req, res) => {
    Note.findByIdAndUpdate(req.params.noteId,
      { $set: req.body, lastModificationDate: Date.now() },
      { new: true },
      (err) => {
        if (err) {
          return res.send(err).status(500);
        }
        res.send('Note update successfully');
      });
  }
};

module.exports = NoteController;
