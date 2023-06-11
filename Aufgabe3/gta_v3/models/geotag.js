// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/** * 
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
class GeoTag {

    #name;
    #latitude;
    #longitude;
    #hashtag;

    get name(){
        return this.#name;
    }

    get latitude(){
        return this.#latitude;
    }

    get longitude(){
        return this.#longitude;
    }

    get hashtag(){
        return this.#hashtag;
    }

    constructor (name, latitude, longitude, hashtag = '' ){
        this.#latitude = latitude;
        this.#longitude = longitude;
        this.#name = name;
        this.#hashtag = hashtag;
    }
    
    toJSON() {
        return {
            name: this.#name,
            latitude: this.#latitude,
            longitude: this.#longitude,
            hashtag: this.#hashtag
        }
    }
    toString(){
        return `Name: ${this.name}, Latitude: ${this.latitude}, Longitude: ${this.#longitude}, Hashtag: ${this.hashtag}`
    }
}


module.exports = GeoTag;
