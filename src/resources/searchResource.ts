/// <reference path="../../defs/tsd.d.ts" />
import IResource = require("./iResource");
import IService  = require("../service/iService");
import $inject   = require("../core/inject");
/**
 * ItineraryResource class
 *
 * Defines a Resource and it's characteristics
 * @class ItineraryResource
 */
class SearchResource implements IResource{
    
    public constructor(private context: IService = $inject("service/searchService")) {}

    /**
     * GET method handler
     *
     * @param request
     * @param response
     * @param next
     */
    public get(request: any, response: any, next: any): void {
        var params: any = request.params;
        response.jsonp(this.context.retrieve(params.data, params.platformId));
    }

    /**
     * POST method handler
     *
     * @param request
     * @param response
     * @param next
     */
    public post(request: any, response: any, next: any): void {
        response.json({type: "error", message: "Operation not implemented"});
    }

    /**
     * PUT method handler
     *
     * @param request
     * @param response
     * @param next
     */
    public put(request: any, response: any, next: any): void {
        response.json({type: "error", message: "Operation not implemented"});
    }

    /**
     * DELETE method handler
     *
     * @param request
     * @param response
     * @param next
     */
    public delete(request: any, response: any, next: any): void {
        response.json({type: "error", message: "Operation not implemented"});
    }
}
export = SearchResource;