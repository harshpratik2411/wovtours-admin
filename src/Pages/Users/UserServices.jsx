import APIService from "../APIServices"; // Make sure this contains `baseUrl`

class UserServices {
  static async getAll(page = 1) {
    const url = `${APIService.baseUrl}api/users/customer/?page=${page}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log(" CUSTOMER API RAW RESPONSE:", data);

      return {
        customers: data.results || [],
        totalCount: data.count || 0,
        totalPages: Math.ceil((data.count || 0) / 10),
        currentPage: page,
      };
    } catch (error) {
      console.error(" Failed to fetch customers:", error);

      return {
        customers: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
      };
    }
  }
}

export default UserServices;
