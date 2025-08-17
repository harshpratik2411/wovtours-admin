import APIService from "../APIServices";
import LocalStorage from "../LocalStorage";
import AuthService from "../AuthService";

class PricingCatServices {
  static async getAll(search, orderBy, page, status, level) {
    const url =
      APIService.baseUrl +
      `api/admin/pricing-category/?search=${search}&ordering=${orderBy}&page=${page}&status=${status}&level=${level}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("🟦 API RAW RESPONSE:", data);

      return {
        PricingCategory: data.results.map((PricingCat) => ({
          id: PricingCat.id,
          title: PricingCat.title,
          desc: PricingCat.description,
          status: PricingCat.status,
          start_age:PricingCat.start_age,
          end_age:PricingCat.end_age,
          created_at: PricingCat.created_at,
          updated_at: PricingCat.updated_at, 
          
        })),
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

   static async get(id) {
    const url = APIService.baseUrl + `api/admin/pricing-category/${id}/`;
    console.log("URL called", url);

    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const PricingCat = await response.json();

      return {
        id: PricingCat .id,
        name: PricingCat .title,
        desc: PricingCat .description,
        status: PricingCat .status,
        start_age:PricingCat.start_age,
        end_age:PricingCat.end_age,
        created_at:PricingCat.created_at,
        updated_at: PricingCat.updated_at, 
        
      };
    } catch (error) {
      console.error("Failed to fetch pricing category:", error);
      return null;
    }
  }
static async update(id, data) {
    console.log("Update API called");

    const url = APIService.baseUrl + `api/admin/pricing-category/${id}/`;

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
        await APIService.refreshToken();
        return this.update(id, data);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to update pricing category with id ${id}:`, error);
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
        await APIService.refreshToken();
        return this.add(data);
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
  static async delete(id) {
    const url = APIService.baseUrl + `api/admin/pricing-category/${id}/`;

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
        await APIService.refreshToken();
        return this.delete(id);
      } else if (APIService.isDeleted(response.status)) {
        return true;
      }

      return false;
    } catch (error) {
      console.error(`Failed to delete pricing category with id ${id}:`, error);
      return false;
    }
  }
}

export default PricingCatServices;
