const fs = require( 'fs' );
const Flickr = require( 'flickr-sdk' );
const flickr = new Flickr( process.env.FLICKR_API_KEY );

const config = JSON.parse( fs.readFileSync( './bin/config.json' ).toString() );
const portfolio = { albums:[], photos:[], tags:[], places:[] };

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
      extras: [
        'tags',
        'geo',
        'url_sq',
        'url_t',
        'url_s',
        'url_q',
        'url_m',
        'url_n',
        'url_z',
        'url_c',
        'url_l',
        'url_o'
      ]
    } ).then( function ( res ) {
      console.log( `Found ${res.body.photoset.photo.length} photos in album ${album.title}` );
      for( const photo of res.body.photoset.photo ) {

        // remove some fields that are not needed
        for ( const field of [
          'secret',
          'server',
          'farm',
          'isprimary',
          'ispublic',
          'isfriend',
          'isfamily',
          'geo_is_public',
          'geo_is_contact',
          'geo_is_friend',
          'geo_is_family'
        ] ) {
          delete photo[field];
        }

        // push in albums
        album.photos.push( photo.id );

        // push in main photos list
        portfolio.photos.push( photo );

        // process tags
        const photoTags = photo.tags.split( ' ' );
        const existingTags = portfolio.tags.map( tag => tag.tag );

        // add each photo tag in portfolio list of tags if not already there
        for( const tag of photoTags ) {
          if( !existingTags.includes( tag ) ) {
            portfolio.tags.push( { tag: tag, photos:[] } );
          }
        }

        // push in tags' photos list
        for( const tag of portfolio.tags ) {
          if ( photoTags.includes( tag.tag ) ) {
            tag.photos.push( photo.id );
          }
        }

        // process location - only extract country from existing place information
        // todo
      }
    } ).catch( function ( err ) {
      console.error( err );
    } );
  }

  console.log( JSON.stringify( portfolio, null, 2 ) );

  // write content in file
  fs.writeFileSync( './public/portfolio.json', JSON.stringify( portfolio, null, 2 ) );

  if( !process.env.CI ) {
    fs.writeFileSync( './src/portfolio.json', JSON.stringify( portfolio, null, 2 ) );
  }

} )();
