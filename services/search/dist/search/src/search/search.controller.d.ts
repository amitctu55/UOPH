import { SearchService } from "./search.service";
export declare class SearchController {
    private searchService;
    constructor(searchService: SearchService);
    searchHospitals(query: string): Promise<any[]>;
    searchDoctors(query: string): Promise<any[]>;
    searchAll(query: string): Promise<any[]>;
}
