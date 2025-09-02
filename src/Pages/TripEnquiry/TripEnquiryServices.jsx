import APIService from "../APIServices";
import LocalStorage from "../LocalStorage";
import AuthService from "../AuthService";

class TripEnquiryServices {
  static async getAll(page) {
    const url = APIService.baseUrl + `api/enquiry/trip/?page=${page}`;

    try {
      const response = await fetch(url, {
       
      });

      const data = await response.json();
      console.log("🟦 API RAW RESPONSE:", data);

      return {
        enquiries: data.results,
        totalCount: data.count,
        totalPages: Math.ceil(data.count / 10),
        currentPage: page,
      };
    } catch (error) {
      console.error("Failed to fetch tags:", error);
      return {
        enquiries: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
      };
    }
  }
}
export default TripEnquiryServices;
