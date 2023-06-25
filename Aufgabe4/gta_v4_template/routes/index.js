// File origin: VS1LAB A3, A4

/**
 * This script defines the main router of the GeoTag server.
 * It's a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * Define module dependencies.
 */

const express = require('express');
const router = express.Router();

/**
 * The module "geotag" exports a class GeoTagStore. 
 * It represents geotags.
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag');

/**
 * The module "geotag-store" exports a class GeoTagStore. 
 * It provides an in-memory store for geotag objects.
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store');
let bazadate = new GeoTagStore();
const datePrimite = require('../models/geotag-examples');
datePrimite.tagList.forEach(geoTag => 
  {
    bazadate.addGeoTag(new GeoTag(geoTag[0],geoTag[1],geoTag[2],geoTag[3]))
  });

// App routes (A3)

/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */

router.get('/', (req, res) => {
  res.render('index', { taglist:bazadate.Toate() })
});

router.post('/tagging', (req, res) => {
  bazadate.addGeoTag(new GeoTag(req.body.latitude, req.body.longitude, req.body.name, req.body.hashtag));
  res.render('index', {
    taglist: bazadate.Toate(), 
    query: req.body.query,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  })
});


router.post('/discovery', (req, res) => {
  let { searchTerm, latitudeSearch, longitudeSearch} = req.body;

  const current = new GeoTag( searchTerm, latitudeSearch, longitudeSearch)
  console.log(req.body)
  let results = GeoTagStore.searchNearbyGeoTags(current, searchTerm)
  res.render('index', { taglist: results , latitude : latitudeSearch, longitude: longitudeSearch})
})

// API routes (A4)

/**
 * Route '/api/geotags' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the fields of the Discovery form as query.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As a response, an array with Geo Tag objects is rendered as JSON.
 * If 'searchterm' is present, it will be filtered by search term.
 * If 'latitude' and 'longitude' are available, it will be further filtered based on radius.
 */

// TODO: ... your code here ...
router.get('/api/geotags', (req, res) => {
  let taglist = [];
  const latitude = parseFloat(req.query.latitude);
  const longitude = parseFloat(req.query.longitude);
  const searchTerm = req.query.searchTerm;

  if(latitude != null && longitude != null)
    if(searchTerm){
      taglist = bazadate.searchNearbyGeoTags (searchTerm, latitude, longitude);
    }
    else{taglist = bazadate.getNearbyGeoTags(latitude,longitude);}
    else{taglist = bazadate.Toate();}

    res.json(taglist);
});

/**
 * Route '/api/geotags' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * The URL of the new resource is returned in the header as a response.
 * The new resource is rendered as JSON in the response.
 */

// TODO: ... your code here ...
router.post('/api/geotags', (req, res) => {

    const name = req.body.name;
    const latitude = parseFloat(req.body.latitude);
    const longitude = parseFloat(req.body.longitude);
    const hashtag = req.body.hashtag;

//--- neuer Tag mit entsprechender id ---//
    let id = bazadate.addGeoTag(new GeoTag(name, latitude, longitude, hashtag));
//--- URL des neuen Tags soll im Location HTTP-Header mit AJAX zurückgesandt werden ---//
    res.set('Location', `/api/geotags/${id}`);
    res.sendStatus(201);
});

/**
 * Route '/api/geotags/:id' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * The requested tag is rendered as JSON in the response.
 */

// TODO: ... your code here ...
router.get('/api/geotags/:id', (req, res) => {
  const id = req.params.id;
//--- finde den GeoTag mit dieser id und übergebe sie an geotag ---//
  let geoTag = bazadate.IdToTag(id);
  res.json(geoTag);
})


/**
 * Route '/api/geotags/:id' for HTTP 'PUT' requests.
 * (http://expressjs.com/de/4x/api.html#app.put.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 * 
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * Changes the tag with the corresponding ID to the sent value.
 * The updated resource is rendered as JSON in the response. 
 */

// TODO: ... your code here ...
router.put('/api/geotags/:id', (req, res) => {
  const id = req.params.id;
  const latitude = parseFloat(req.body.latitude);
  const longitude = parseFloat(req.body.longitude);
  const name = req.body.name;
  const hashtag = req.body.hashtag;

  let geoTag = bazadate.Inlocuit(id, new GeoTag(latitude, longitude, name, hashtag));

  res.json(geoTag);
});


/**
 * Route '/api/geotags/:id' for HTTP 'DELETE' requests.
 * (http://expressjs.com/de/4x/api.html#app.delete.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * Deletes the tag with the corresponding ID.
 * The deleted resource is rendered as JSON in the response.
 */

// TODO: ... your code here ...
router.delete('/api/geotags/:id', (req, res) => {
  const id = req.params.id;
  let geoTag = bazadate.IdToTag(id);
  bazadate.removeGeoTag(geoTag.name);

  res.json(geoTag);
});

module.exports = router;