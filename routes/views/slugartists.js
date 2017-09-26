var keystone = require('keystone');

exports = module.exports = function(req,res){

  var view = new keystone.View(req,res);
  var locals = res.locals;

  locals.section = 'artist';
  locals.filters = {
    artist: req.params.artist
  }
  locals.data = {
    artist:[]
  }

  view.on('init', function(next){
    var q = keystone.list('Artists').model.findOne({
      slug: locals.filters.artist
    });
    q.exec(function(err, result){
      locals.data.artists = result;
      next(err);
    });
  });
  view.render('specificArtists');

}
