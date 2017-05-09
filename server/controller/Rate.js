const Rate = require('../model/Rate');
const RateController = {
  createRate: (req, res) => {
    if(req.body.number < 1 || req.body.number > 10) return res.send('Bad rate!');
    var rate = new Rate();
    rate._project = req.body.project;
    rate._creator = req.body.creator;
    rate.number = req.body.number.toFixed(2);
    rate.created_at = Date.now();
    rate.updated_at = Date.now();
    rate.save((err) => {
      if(err) return res.send(err);
      res.json({ message: 'Rate created!' });
    });
  },
  updateRate: (req, res) => {
    Rate.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, rate) => {
      if(err) return res.send(err).status(500);
      res.json(rate)
    });
  },
  deleteRate: (req, res) => {
    Rate.findByIdAndRemove(req.params.id, (err, rate) => {
      if(err) return res.send(err).status(500);
      let str = (rate) ? `Rate ${rate._id} deleted!` : 'No rate were deleted.'
      res.json({ message: str })
    });
  }
};
module.exports = RateController;
