import APIService from "../APIServices";
import LocalStorage from "../LocalStorage";
import AuthService from "../AuthService";

class DifficultiesServices {
  static async getAll(search, orderBy, page, status, level) {
    const url =
      APIService.baseUrl +
      `api/admin/difficulty/?search=${search}&ordering=${orderBy}&page=${page}&status=${status}&level=${level}`;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: LocalStorage.getAccesToken(),
        },
      });
      if (APIService.isUnauthenticated(response.status)) {
        const hasRefreshed = await APIService.refreshToken();
        if (hasRefreshed === true) {
          return this.getAll(search, orderBy, page, status, level);
        }
      }
      if (APIService.isError(response.status)) {
        const errorData = await response.json();
        alert(errorData["error"]);
        return null;
      }

      const data = await response.json();
      console.log("🟦 Difficulty API RAW RESPONSE:", data);

      return {
        difficulties: data.results,
        totalCount: data.count,
        totalPages: Math.ceil(data.count / 10),
        currentPage: page,
      };
    } catch (error) {
      console.error("Failed to fetch difficulties:", error);
      return {
        difficulties: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
      };
    }
  }

  static async get(id) {
    const url = APIService.baseUrl + `api/admin/difficulty/${id}/`;
    console.log("URL called", url);

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

      const difficulty = await response.json();

      return difficulty;
    } catch (error) {
      console.error("Failed to fetch difficulty:", error);
      return null;
    }
  }

  // Add a new difficulty
  static async add(data) {
    const url = APIService.baseUrl + "api/admin/difficulty/";
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
      console.error("Failed to add difficulty:", error);
      return null;
    }
  }

  // Update difficulty by ID
  static async update(id, data) {
    console.log("Update API called");

    const url = APIService.baseUrl + `api/admin/difficulty/${id}/`;

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
          return this.update(id, data);
        }
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to update difficulty with id ${id}:`, error);
      return null;
    }
  }

  // Delete difficulty by ID
  static async delete(id) {
    const url = APIService.baseUrl + `api/admin/difficulty/${id}/`;

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
    return this.delete(id);
  } }

      return false;
    } catch (error) {
      console.error(`Failed to delete difficulty with id ${id}:`, error);
      return false;
    }
  }
}

export default DifficultiesServices;
