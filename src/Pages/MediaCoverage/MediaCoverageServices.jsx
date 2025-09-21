import APIService from "../APIServices";
import LocalStorage from "../LocalStorage";

class MediaCoverageServices {
  static async getAll(search, orderBy, page, status) {
    const url =
      APIService.baseUrl +
      `api/admin/media-coverage/?search=${search}&ordering=${orderBy}&page=${page}&status=${status}`;

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
        MediaCoverages: data.results,
        totalCount: data.count,
        totalPages: Math.ceil(data.count / 10),
        currentPage: page,
      };
    } catch (error) {
      console.error("Failed to fetch media coverages:", error);
      return {
        MediaCoverages: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
      };
    }
  }

  static async get(id) {
    const url = APIService.baseUrl + `api/admin/media-coverage/${id}/`;
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
          return this.get(id);
        }
      }

      if (APIService.isError(response.status)) {
        const errorData = await response.json();
        alert(errorData["error"]);
        return null;
      }

      const mediaCoverage = await response.json();

      return mediaCoverage;
    } catch (error) {
      console.error("Failed to fetch media coverage:", error);
      return null;
    }
  }

  static async update(id, data, mediaChanged = false) {
  console.log("Update API called");

  const url = APIService.baseUrl + `api/admin/media-coverage/${id}/`;

  try {
    let requestOptions;

    if (mediaChanged) {
      const formData = new FormData();

      // Append non-file fields
      for (const key in data) {
        if (key !== 'mediaFile' && data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      }

      // ✅ Append the file with the correct key name
      if (data.mediaFile) {
        formData.append("media", data.mediaFile); // <- adjust "media" if backend uses another field name
      }

      requestOptions = {
        method: "PUT",
        headers: {
          Authorization: LocalStorage.getAccesToken(), // ✅ Use your token
          // ❌ Do not set Content-Type for FormData
        },
        body: formData,
      };
    } else {
      const filteredData = { ...data };
      delete filteredData.mediaFile; // ✅ Ensure mediaFile is not sent in JSON

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
      const hasRefreshed = await APIService.refreshToken();
      if (hasRefreshed === true) {
        return this.update(id, data, mediaChanged); 
      }
    }

    if (!response.ok) {
      console.error("Failed to update media coverage:", await response.text());
      return false;
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating media coverage:", error);
    return false;
  }
}


  static async add(data) {
    const url = APIService.baseUrl + "api/admin/media-coverage/";
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
      console.error("Failed to add media coverage:", error);
      return null;
    }
  }

  static async delete(id) {
    const url = APIService.baseUrl + `api/admin/media-coverage/${id}/`;

    try {
      let response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: LocalStorage.getAccesToken(),
        },
      });

      if (APIService.isUnauthenticated(response.status)) {
        const hasRefreshed = await APIService.refreshToken();
        if (hasRefreshed === true) {
          return this.delete(id);
        }
      }

      return response.ok;
    } catch (error) {
      console.error(`Failed to delete media coverage with id ${id}:`, error);
      return false;
    }
  }
}

export default MediaCoverageServices;
 