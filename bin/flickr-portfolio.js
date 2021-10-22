( async function () {
  const fs = require( 'fs' );
  const Flickr = require( 'flickr-sdk' );
  const { FLICKR_API_KEY, FLICKR_USER_ID, FLICKR_COLLECTION_ID, BIG_DATA_CLOUD_API_KEY } = process.env;
  const flickr = new Flickr( FLICKR_API_KEY );
  const geoClient = require( '@bigdatacloudapi/client' )( BIG_DATA_CLOUD_API_KEY );

  const portfolio = { albums:[], photos:[], tags:[], places:[] };

  // get albums in Portfolio collection
  await flickr.collections.getTree(
    {
      user_id: FLICKR_USER_ID,
      collection_id: FLICKR_COLLECTION_ID
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
      user_id: FLICKR_USER_ID,
      photoset_id:album.id,
      extras: [
        'date_taken',
        'date_upload',
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
        'url_o',
        'url_h',
        'url_k'
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
          tag.count = tag.photos.length;
        }

        // resolve country from coordinates
        if( photo.latitude && photo.longitude )
        {
          geoClient.getReverseGeocodeWithTimezone( { latitude:photo.latitude, longitude: photo.longitude } )
            .then( jsonResult => {
              photo.country = jsonResult.countryName;

              if( photo.country ) {
                const existingPlaces = portfolio.places.map( place => place.name );

                // create place if it doesn't already exist
                if( !existingPlaces.includes( photo.country ) ) {
                  portfolio.places.push( { name: photo.country, photos:[], count: 0 } );
                }

                // push photo in place's photos list
                for( const place of portfolio.places ) {
                  if ( place.name === photo.country ) {
                    place.photos.push( photo.id );
                  }
                  place.count = place.photos.length;
                }}
            } )
            .catch( function( error ) {
              console.error( 'Error getting country from coordinates: ', error );
            } );
        }
      }
    } ).catch( function ( err ) {
      console.error( err );
    } );

    album.photos.sort( ( a, b ) => parseInt( b.count ) - parseInt( a.count ) );
  }

  // sort albums by photo count
  portfolio.albums.sort( ( a, b ) => parseInt( b.photos.length ) - parseInt( a.photos.length ) );

  // sort tags by count
  portfolio.tags.sort( ( a, b ) => parseInt( b.count ) - parseInt( a.count ) );

  // sort places by count
  portfolio.places.sort( ( a, b ) => parseInt( b.count ) - parseInt( a.count ) );

  // write content in file
  fs.writeFileSync( './public/portfolio.json', JSON.stringify( portfolio, null, 2 ) );
} )();
