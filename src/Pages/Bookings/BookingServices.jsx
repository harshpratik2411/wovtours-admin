import APIService from "../APIServices";
import LocalStorage from "../LocalStorage";
import AuthService from "../AuthService";

class BookingServices {
  static async getAll(page = 1) {
    // Make sure baseUrl ends with '/'
    const baseUrl = APIService.baseUrl.endsWith("/")
      ? APIService.baseUrl
      : APIService.baseUrl + "/";

    const url = `${baseUrl}api/bookings/trip-bookings/?page=${page}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("🟩 CUSTOMER API RAW RESPONSE:", data);

      return {
        bookings: data.results || [],
        totalCount: data.count || 0,
        totalPages: Math.ceil((data.count || 0) / (data.page_size || 10)),
        currentPage: page,
      };
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      return {
        bookings: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
      };
    }
  }
}

export default BookingServices;
