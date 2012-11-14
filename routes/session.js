
/*
 * POST session create
 */

var uuid = require('node-uuid');

exports.create = function(req, res){
    res.redirect('/'+uuid.v4());
};
