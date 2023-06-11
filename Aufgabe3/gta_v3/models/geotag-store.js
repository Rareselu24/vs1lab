// File origin: VS1LAB A3

const GeoTag = require("./geotag");
const GeoTagExamples = require("./geotag-examples");

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields.  
 */

class GeoTagStore {

    // TODO: ... your code here ...
    static #geoTags = GeoTagExamples.ConvertToGeoTag();

    static addGeoTag = (geoTag) => {
      this.#geoTags.push(geoTag);
      console.log(this.#geoTags)
    };

    static removeGeoTag = (name) => {
      const index = geoTags.findIndex((tag) => tag.name === name);
      if (index !== -1) {
        this.#geoTags.splice(index, 1);
      }
    };

    static calculateDistance(geoTag,lastgeotag) {
      if(lastgeotag.longitude != geoTag.longitude || lastgeotag.latitude != geoTag.latitude){
        const R = 6371e3; // metres
        const φ1 = lastgeotag.latitude * Math.PI/180; // φ, λ in radians
        const φ2 = geoTag.latitude * Math.PI/180;
        const Δφ = (geoTag.latitude - lastgeotag.latitude) * Math.PI/180;
        const Δλ = (geoTag.longitude - lastgeotag.longitude) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + 
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c; // in metres
        return d / 1000;
      }

      return 0;
  }

    static getNearbyGeoTags = (current, d = 50) => {
      return this.#geoTags.filter((geoTag) => this.calculateDistance(geoTag, current) <= d); 
    };

    static searchNearbyGeoTags = (current, searchTerm) => {
      return this.getNearbyGeoTags(current).filter(
        (tag) => (tag.name.includes(searchTerm) || tag.hashtag.includes(searchTerm))
      );
    };
}

module.exports = GeoTagStore;
