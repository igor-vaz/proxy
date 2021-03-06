'use strict';
/**
 * Describes a Itinerary instance
 * @class {Itinerary}
 */
class Itinerary {
	
	constructor(line, description, agency, keywords, spots, streets) {
		this.line = (!line || line==='')? 'indefinido' : line.toString();
		this.description = (!description || description==='')? 'desconhecido' : description;
		this.agency = agency || '';
		this.keywords = keywords || '';
		this.spots = spots || [];
        this.streets = streets || [];
	}
}
module.exports = Itinerary;