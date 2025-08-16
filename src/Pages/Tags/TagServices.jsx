import APIService from "../APIServices";
import LocalStorage from "../LocalStorage";
import AuthService from "../AuthService";

class TagServices {
  static async getAll(search, orderBy, page, status) {
    const url =
      APIService.baseUrl +
      `api/admin/tags/?search=${search}&ordering=${orderBy}&page=${page}&status=${status}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("🟦 API RAW RESPONSE:", data);

      // ✅ Return full object, not just array
      return {
        tags: data.results.map((tag) => ({
          id: tag.id,
          title: tag.title,
          description: tag.description,
          status: tag.status,
          created_at: tag.created_at,
          updated_at: tag.updated_at,
        })),
        totalCount: data.count,
        totalPages: Math.ceil(data.count / 10), // adjust if page size is different
        currentPage: page,
      };
    } catch (error) {
      console.error("Failed to fetch tags:", error);
      return {
        tags: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
      };
    }
  }

  static async get(id) {
    const url = APIService.baseUrl + `api/admin/tags/${id}/`;
    console.log("URL called", url);

    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const tag = await response.json();

      return {
        id: tag.id,
        name: tag.title,
        desc: tag.description,
        status: tag.status,
        created_at: tag.created_at,
        updated_at: tag.updated_at,
      };
    } catch (error) {
      console.error("Failed to fetch tags:", error);
      return {
        tags: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
      };
    }
  }

  static async add(data) {
    const url = APIService.baseUrl + "api/admin/tags/";
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
        this.add(data);
      }
      if (APIService.isError(response.status)) {
        //todo:
        alert(response.json()["error"]);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to add tag:", error);

      return null;
    }
  }

  static async update(id, data) {
    console.log("Update API called");
    const url = APIService.baseUrl + `api/admin/tags/${id}/`;
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
        this.update(id, data);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to update tag with id ${id}:`, error);
      return null;
    }
  }

  static async delete(id) {
    const url = APIService.baseUrl + `api/admin/tags/${id}/`;
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
        this.delete(id);
      } else if (APIService.isDeleted(response.status)) {
        return true;
      }
    } catch (error) {
      console.error(`Failed to delete tag with id ${id}:`, error);
      return false;
    }
  }
}

export default TagServices;
