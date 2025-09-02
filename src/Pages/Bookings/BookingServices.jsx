import APIService from "../APIServices";
import LocalStorage from "../LocalStorage";
import AuthService from "../AuthService";

class BookingServices {
  static async getAll(page) {
    const url = APIService.baseUrl + `api/users/customer/?page=${page}`;

    try {
      const response = await fetch(url, {
        // No headers or authorization — same as TripEnquiryServices
      });

      const data = await response.json();
      console.log("🟩 CUSTOMER API RAW RESPONSE:", data);

      return {
        customers: data.results,
        totalCount: data.count,
        totalPages: Math.ceil(data.count / 10),
        currentPage: page,
      };
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      return {
        customers: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
      };
    }
  }
}

export default BookingServices;
