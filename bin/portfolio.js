const fs = require( 'fs' );
const Flickr = require( 'flickr-sdk' );
const flickr = new Flickr( process.env.FLICKR_API_KEY );

const config = JSON.parse( fs.readFileSync( './bin/config.json' ).toString() );
const portfolio = { 'albums':[] };

( async function () {
  // get albums in Portfolio collection
  await flickr.collections.getTree(
    {
      user_id: config.userId,
      collection_id: config.collectionId
    } ).then( function ( res ) {
    console.log( `Found ${res.body.collections.collection[0].set.length} albums in collection` );
    for ( const album of res.body.collections.collection[0].set ) {
      portfolio.albums.push( album );
    }
  } ).catch( function ( err ) {
    console.error( err );
  } );

  // get photos for each album
  for( const album of portfolio.albums ) {
    album.photos = [];

    await flickr.photosets.getPhotos( {
      user_id: config.userId,
      photoset_id:album.id,
      extras: [ 'tags', 'machine_tags' ]
    } ).then( function ( res ) {
      console.log( `Found ${res.body.photoset.photo.length} photos in album ${album.title}` );
      for( const photo of res.body.photoset.photo ) {
        album.photos.push( photo );
      }
    } ).catch( function ( err ) {
      console.error( err );
    } );
  }

  // get sizes for each photo
  for( const album of portfolio.albums ) {
    for( const photo of album.photos ) {
      photo.sizes = [];

      await flickr.photos.getSizes( {
        photo_id: photo.id
      } ).then( function ( res ) {
        photo.sizes =res.body.sizes;
      } ).catch( function ( err ) {
        console.error( err );
      } );
    }
  }

  console.log( JSON.stringify( portfolio, null, 2 ) );

  // write content in file
  fs.writeFileSync( './public/portfolio.json', JSON.stringify( portfolio, null, 2 ) );
} )();
