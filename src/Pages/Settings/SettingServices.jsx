import APIService from "../APIServices";
import LocalStorage from "../LocalStorage";
import AuthService from "../AuthService";

class SettingsServices {
  static async getAll(search, orderBy, page) {
    const url =
      APIService.baseUrl +
      `api/admin/settings/?search=${search}&ordering=${orderBy}&page=${page}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("🟦 API RAW RESPONSE:", data);

      return {
        settings: data.results,
        totalCount: data.count,
        totalPages: Math.ceil(data.count / 10),
        currentPage: page,
      };
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      return {
        settings: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
      };
    }
  }

  static async get(id = 1) {
    const url = APIService.baseUrl + `api/admin/settings/${id}/`;
    console.log("URL called", url);

    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const setting = await response.json();

      return {
        id: setting.id,
        key: setting.key,
        value: setting.value,
        description: setting.description,
        created_at: setting.created_at,
        updated_at: setting.updated_at,
      };
    } catch (error) {
      console.error("Failed to fetch setting:", error);
      return null;
    }
  }

  static async update(id = 1, data) {


    const url = APIService.baseUrl + `api/admin/settings/${id}/`;

    try {
      let requestOptions;

      const formData = new FormData();
      for (const key in data) {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      }
      formData.append('country_id', 102);
      // formData.append('country', null);
      formData.forEach((val,key ) => {
        console.log(key, " --> ", val);
      });


      requestOptions = {
        method: "PUT",
        headers: {
          Authorization: LocalStorage.getAccesToken(),
        },
        body: formData,
      };
      let response = await fetch(url, requestOptions);
      // let response = await fetch(url, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: LocalStorage.getAccesToken(),
      //   },
      //   body: JSON.stringify(data),
      // });

      console.log("Response = ", response.status);

      if (APIService.isUnauthenticated(response.status)) {
        await APIService.refreshToken();
        return this.update(id, data);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to update setting with id ${id}:`, error);
      return null;
    }
  }

  static async add(data) {
    const url = APIService.baseUrl + "api/admin/settings/";
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
      console.error("Failed to add setting:", error);
      return null;
    }
  }

  static async delete(id) {
    const url = APIService.baseUrl + `api/admin/settings/${id}/`;

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
      console.error(`Failed to delete setting with id ${id}:`, error);
      return false;
    }
  }
}

export default SettingsServices;
