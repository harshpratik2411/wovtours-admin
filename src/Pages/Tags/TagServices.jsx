
import APIService from "../APIServices";

class TagServices {
  static async getAll(searh,orderBy) {
    const url = APIService.baseUrl + `api/admin/tags/?search=${searh}&orderBy${orderBy}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Map API results to your format
      return data.results.map(tag => ({
        id: tag.id,
        name: tag.title,
        desc: tag.description,
        status: tag.status === "Inactive" ? "InActive" : tag.status,
        slug: tag.title.toLowerCase().replace(/\s+/g, '-'),
        booked: 0,
      }));
    } catch (error) {
    console.error("Failed to fetch tags:", error);
      return [];
    }
  }

  static get(id) {}
   static add(data) {}
   static update(data) {}
   static delete(id) {}
}

export default TagServices;
