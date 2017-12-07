const mongoose = require('mongoose');
const User = mongoose.model('User');
const {sendJSONResponse} = require('../../helpers');


module.exports.index = (req, res) => {
  sendJSONResponse(res, 200, {message : 'I work'});
};