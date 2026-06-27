import { Controller, Get, Query, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { SearchService } from "./search.service";

@ApiTags("Search")
@Controller("search")
export class SearchController {
  constructor(private searchService: SearchService) {}

  /**
   * Search hospitals
   */
  @Get("hospitals")
  @ApiOperation({ summary: "Search hospitals" })
  @ApiQuery({ name: "q", required: true, description: "Search query" })
  @ApiResponse({ status: 200, description: "List of matching hospitals" })
  async searchHospitals(@Query("q") query: string): Promise<any[]> {
    return this.searchService.searchHospitals(query);
  }

  /**
   * Search doctors
   */
  @Get("doctors")
  @ApiOperation({ summary: "Search doctors" })
  @ApiQuery({ name: "q", required: true, description: "Search query" })
  @ApiResponse({ status: 200, description: "List of matching doctors" })
  async searchDoctors(@Query("q") query: string): Promise<any[]> {
    return this.searchService.searchDoctors(query);
  }

  /**
   * Search across all entities
   */
  @Get()
  @ApiOperation({ summary: "Search across hospitals and doctors" })
  @ApiQuery({ name: "q", required: true, description: "Search query" })
  @ApiResponse({ status: 200, description: "Search results" })
  async searchAll(@Query("q") query: string): Promise<any[]> {
    return this.searchService.searchAll(query);
  }
}
