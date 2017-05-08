const UserModel = require('../model/User');

const UserController = {

  getUsers: (req, res) => {
    UserModel.find()
    .exec((err, users) => {
      if (err) { res.send(err); }
      res.json(users);
    });
  },

  createUser: (req, res) => {
    const user = new UserModel()
    user.name = req.body.name
    user.type = req.body.type
    user.age = req.body.age
    user.save((err, user) => {
      if (err) {
        return res.send(err)
      }
      res.json(user)
    })
  },

  getUser: (req, res) => {
    UserModel.findOne({_id: req.params.id})
    .exec((err, user) => {
      if (err) { res.send(err); }
      res.json(user);
    });
  },

  updateUser: (req, res) => {
    UserModel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true}, (err, user) => {
      console.log('user : ', user)
      if (err) {
        return res.send(err).status(500);
      }
      res.json(user)
    });
  },

  deleteUser: (req, res) => {
    UserModel.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        return res.send(err).status(500);
      }
      res.json({ message: 'User deleted!' })
    });
  }

}

module.exports = UserController;
