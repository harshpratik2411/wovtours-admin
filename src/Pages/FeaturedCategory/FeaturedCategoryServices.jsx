import APIService from "../APIServices";
import LocalStorage from "../LocalStorage";

class FeaturedCategoryServices {
  static async getAll(search, orderBy, page, status) {
    const url =
      APIService.baseUrl +
      `api/admin/featured-category/?search=${search}&ordering=${orderBy}&page=${page}&status=${status}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: LocalStorage.getAccesToken(),
        },
      });

      if (APIService.isUnauthenticated(response.status)) {
        const hasRefreshed = await APIService.refreshToken();
        if (hasRefreshed === true) {
          return this.getAll(search, orderBy, page, status);
        }
      }

      if (APIService.isError(response.status)) {
        const errorData = await response.json();
        alert(errorData["error"]);
        return null;
      }

      const data = await response.json();

      return {
        featuredCategories: data.results,
        totalCount: data.count,
        totalPages: Math.ceil(data.count / 10),
        currentPage: page,
      };
    } catch (error) {
      console.error("Failed to fetch featured categories:", error);
      return {
        featuredCategories: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
      };
    }
  }

  static async get(id) {
    const url = APIService.baseUrl + `api/admin/featured-category/${id}/`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: LocalStorage.getAccesToken(),
        },
      });

      if (APIService.isUnauthenticated(response.status)) {
        const hasRefreshed = await APIService.refreshToken();
        if (hasRefreshed === true) {
          return this.get(id);
        }
      }

      if (APIService.isError(response.status)) {
        const errorData = await response.json();
        alert(errorData["error"]);
        return null;
      }

      const featuredCategory = await response.json();

      return featuredCategory;
    } catch (error) {
      console.error("Failed to fetch featured category:", error);
      return null;
    }
  }

  static async add(data) {
    const url = APIService.baseUrl + "api/admin/featured-category/";

    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: LocalStorage.getAccesToken(),
        },
        body: JSON.stringify(data),
      });

      if (APIService.isUnauthenticated(response.status)) {
        const hasRefreshed = await APIService.refreshToken();
        if (hasRefreshed === true) {
          return this.add(data);
        }
      }

      if (APIService.isError(response.status)) {
        const errorData = await response.json();
        alert(errorData["error"]);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to add featured category:", error);
      return null;
    }
  }

  static async update(id, data) {
    const url = APIService.baseUrl + `api/admin/featured-category/${id}/`;

    try {
      let response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: LocalStorage.getAccesToken(),
        },
        body: JSON.stringify(data),
      });

      if (APIService.isUnauthenticated(response.status)) {
        const hasRefreshed = await APIService.refreshToken();
        if (hasRefreshed === true) {
          return this.update(id, data);
        }
      }

      if (!response.ok) {
        console.error("Failed to update featured category:", await response.text());
        return false;
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating featured category:", error);
      return false;
    }
  }
}

export default FeaturedCategoryServices;
