import APIService from "../APIServices";
import LocalStorage from "../LocalStorage";
import AuthService from "../AuthService";

class BannerServices {
  static async getAll(search, orderBy, page, status, level) {
    const url =
      APIService.baseUrl +
      `api/admin/banner/?search=${search}&ordering=${orderBy}&page=${page}&status=${status}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: LocalStorage.getAccesToken(),
        },
      });

      if (APIService.isUnauthenticated(response.status)) {
        await APIService.refreshToken();
        return this.getAll(search, orderBy, page, status,);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        Banners: data.results.map((banner) => ({
          id: banner.id,
          title: banner.title,
          banner_type: banner.banner_type,
          media_url: banner.media_url,
          status: banner.status,
          created_at: banner.created_at,
          updated_at: banner.updated_at,
        })),
        totalCount: data.count,
        totalPages: Math.ceil(data.count / 10),
        currentPage: page,
      };
    } catch (error) {
      console.error("Failed to fetch banners:", error);
      return {
        Banners: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
      };
    }
  }

  static async get(id) {
    const url = APIService.baseUrl + `api/admin/banner/${id}/`;
    console.log("URL called", url);

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: LocalStorage.getAccesToken(),
        },
      });

      if (APIService.isUnauthenticated(response.status)) {
        await APIService.refreshToken();
        return this.get(id);
      }

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const banner = await response.json();

      return {
        id: banner.id,
        title: banner.title,
        banner_type: banner.banner_type,
        media_url: banner.media_url,
        status: banner.status,
        created_at: banner.created_at,
        updated_at: banner.updated_at,
      };
    } catch (error) {
      console.error("Failed to fetch banner:", error);
      return null;
    }
  }

  static async update(id, data, mediaChanged = false) {
    console.log("Update API called");

    const url = APIService.baseUrl + `api/admin/banner/${id}/`;

    try {
      let requestOptions;

      if (mediaChanged) {
        const formData = new FormData();
        for (const key in data) {
          if (data[key] !== undefined && data[key] !== null) {
            formData.append(key, data[key]);
          }
        }

        requestOptions = {
          method: "PUT",
          headers: {
            Authorization: LocalStorage.getAccesToken(),
          },
          body: formData,
        };
      } else {
        const filteredData = { ...data };
        delete filteredData.media;

        requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: LocalStorage.getAccesToken(),
          },
          body: JSON.stringify(filteredData),
        };
      }

      let response = await fetch(url, requestOptions);

      if (APIService.isUnauthenticated(response.status)) {
        await APIService.refreshToken();
        return this.update(id, data, mediaChanged);
      }

      if (!response.ok) {
        console.error("Failed to update banner:", await response.text());
        return false;
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating banner:", error);
      return false;
    }
  }

  static async add(data) {
    const url = APIService.baseUrl + "api/admin/banner/";
    console.log("Data = ", data);

    try {
      const formData = new FormData();
      for (const key in data) {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      }

      let response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: LocalStorage.getAccesToken(),
        },
        body: formData,
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
      console.error("Failed to add banner:", error);
      return null;
    }
  }

  static async delete(id) {
    const url = APIService.baseUrl + `api/admin/banner/${id}/`;

    try {
      let response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: LocalStorage.getAccesToken(),
        },
      });

      if (APIService.isUnauthenticated(response.status)) {
        await APIService.refreshToken();
        return this.delete(id);
      } else if (APIService.isDeleted(response.status)) {
        return true;
      }

      return false;
    } catch (error) {
      console.error(`Failed to delete banner with id ${id}:`, error);
      return false;
    }
  }
}

export default BannerServices;
