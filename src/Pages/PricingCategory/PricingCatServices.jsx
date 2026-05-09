import APIService from "../APIServices";
import LocalStorage from "../LocalStorage";
import AuthService from "../AuthService";

class PricingCatServices {
  static async getAll(search, orderBy, page, status, level) {
    const url =
      APIService.baseUrl +
      `api/admin/pricing-category/?search=${search}&ordering=${orderBy}&page=${page}&status=${status}&level=${level}`;

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
      console.log("🟦 API RAW RESPONSE:", data);

      return {
        PricingCategory: data.results,
        totalCount: data.count,
        totalPages: Math.ceil(data.count / 10),
        currentPage: page,
      };
    } catch (error) {
      console.error("Failed to fetch pricing categories:", error);
      return {
        difficulties: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
      };
    }
  }

  static async get(slug) {
    const url = APIService.baseUrl + `api/admin/pricing-category/${slug}/`;
    console.log("URL called", url);

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: LocalStorage.getAccesToken(),
        },
      });

      if (APIService.isUnauthenticated(response.status)) {
        const hasRefreshed = await APIService.refreshToken();
        if (hasRefreshed === true) {
          return this.get(slug);
        }
      }
      if (APIService.isError(response.status)) {
        const errorData = await response.json();
        alert(errorData["error"]);
        return null;
      }
      const PricingCat = await response.json();

      return PricingCat;
    } catch (error) {
      console.error("Failed to fetch pricing category:", error);
      return null;
    }
  }
  static async update(slug, data) {
    console.log("Update API called");

    const url = APIService.baseUrl + `api/admin/pricing-category/${slug}/`;

    try {
      let response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: LocalStorage.getAccesToken(),
        },
        body: JSON.stringify(data),
      });

      console.log("Response = ", response.status);

      if (APIService.isUnauthenticated(response.status)) {
        const hasRefreshed = await APIService.refreshToken();
        if (hasRefreshed === true) {
          return this.update(slug, data);
        }
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to update pricing category with slug ${slug}:`, error);
      return null;
    }
  }
  static async add(data) {
    const url = APIService.baseUrl + "api/admin/pricing-category/";
    console.log("Data = ", data);

    try {
      const response = await fetch(url, {
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
      console.error("Failed to add pricing category:", error);
      return null;
    }
  }
  static async delete(slug) {
    const url = APIService.baseUrl + `api/admin/pricing-category/${slug}/`;

    try {
      let response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: LocalStorage.getAccesToken(),
        },
      });

      console.log("Response = ", response.status);

      
        if (APIService.isUnauthenticated(response.status)) {
  const hasRefreshed = await APIService.refreshToken();
  if (hasRefreshed === true) {
    return this.delete(slug);
  } }

      return false;
    } catch (error) {
      console.error(`Failed to delete pricing category with slug ${slug}:`, error);
      return false;
    }
  }
}

export default PricingCatServices;
