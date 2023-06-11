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

    #Name;
    #Latitude;
    #Longitude;
    #Hashtag;

    get Name(){
        return this.#Name;
    }

    get Latitude(){
        return this.#Latitude;
    }

    get Longitude(){
        return this.#Longitude;
    }

    get Hashtag(){
        return this.#Hashtag;
    }

    constructor (Name, Latitude, Longitude, Hashtag = '' ){
        this.#Latitude = Latitude;
        this.#Longitude = Longitude;
        this.#Name = Name;
        this.#Hashtag = Hashtag;
    }
    
    toJSON() {
        return {
            Name: this.#Name,
            Latitude: this.#Latitude,
            Longitude: this.#Longitude,
            Hashtag: this.#Hashtag
        }
    }
    toString(){
        return `Name: ${this.Name}, Latitude: ${this.Latitude}, Longitude: ${this.#Longitude}, Hashtag: ${this.Hashtag}`
    }
}


module.exports = GeoTag;
