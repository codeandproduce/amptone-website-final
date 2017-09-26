var keystone = require('keystone');
var Types = keystone.Field.Types;

var Artists = new keystone.List('Artists', {
  map:{
    name:'name'
  },
  singular:'Artist',
  plural: 'Aritsts',
  autokey:{
    from:'name', path:'slug', unique:true
  }
});

Artists.add({
  name:{
    type:String,
    required: true,
    initial:true
  },
  artistDescription:{
    type:String,
    required:true,
    initial:true
  },
  firstimage:{
    type:Types.CloudinaryImage
  },
  secondimage:{
    type:Types.CloudinaryImage
  },
  featuredSongName:{
    type:String
  },
  featuredSongDescription:{
    type:String
  },
  featuredSongAlbumName:{
    type:String
  },
  featuredSongLink:{
    type:String
  },
  albumNames:{
    type:String
  },
  albumSoundcloudLinks:{
    type: Types.TextArray
  }
});

Artists.register();
