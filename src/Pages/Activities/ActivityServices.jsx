import APIService from "../APIServices";
import LocalStorage from "../LocalStorage";
import AuthService from "../AuthService";

class ActivityServices {
  static async getAll(search, orderBy, page, status, level) {
    const url =
      APIService.baseUrl +
      `api/admin/activity/?search=${search}&ordering=${orderBy}&page=${page}&status=${status}&level=${level}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
     // console.log("🟦 API RAW RESPONSE:", data);

      return {
        Activities: data.results.map((activity) => ({
          id: activity.id,
          title: activity.title,
          description: activity.description,
          media_id: activity.media_id,
          media_url: activity.media_url,
          status: activity.status,
          created_at: activity.created_at,
          updated_at: activity.updated_at,
        })),
        totalCount: data.count,
        totalPages: Math.ceil(data.count / 10),
        currentPage: page,
      };
    } catch (error) {
      console.error("Failed to fetch activities:", error);
      return {
        Activities: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
      };
    }
  }

  static async get(id) {
    const url = APIService.baseUrl + `api/admin/activity/${id}/`;
    console.log("URL called", url);

    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const activity = await response.json();

      return {
        id: activity.id,
        title: activity.title,
        description: activity.description,
        media_id: activity.media_id,
        media_url: activity.media_url,
        status: activity.status,
        created_at: activity.created_at,
        updated_at: activity.updated_at,
      };
    } catch (error) {
      console.error("Failed to fetch activity:", error);
      return null;
    }
  }

  static async update(id, data, mediaChanged = false) {
    console.log("Update API called");

    const url = APIService.baseUrl + `api/admin/activity/${id}/`;

    try {
      let requestOptions;

      if (mediaChanged) {
        // Use FormData when media file is updated
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
        // Use JSON for non-media updates (title, description, etc.)
        const filteredData = { ...data };
        delete filteredData.media; // Don't include media if not changed

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

      return await response.json();
    } catch (error) {
      console.error(`Failed to update activity with id ${id}:`, error);
      return null;
    }
  }

  static async add(data) {
    const url = APIService.baseUrl + "api/admin/activity/";
    console.log("Data = ", data);

    try {
      const formData = new FormData();
      for (const key in data) {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      }

      const response = await fetch(url, {
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
      console.error("Failed to add activity:", error);
      return null;
    }
  }

  static async delete(id) {
    const url = APIService.baseUrl + `api/admin/activity/${id}/`;

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
      console.error(`Failed to delete activity with id ${id}:`, error);
      return false;
    }
  }
}

export default ActivityServices;