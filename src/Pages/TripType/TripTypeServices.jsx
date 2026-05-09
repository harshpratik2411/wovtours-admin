import APIService from "../APIServices";
import LocalStorage from "../LocalStorage";

class TripTypeServices {
  static async getAll(search, orderBy, page, status) {
    const url =
      APIService.baseUrl +
      `api/admin/trip-type/?search=${search}&ordering=${orderBy}&page=${page}&status=${status}`; 
      
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
      console.log("Trip Types fetched successfully:",  data.results);

      return {
        TripTypes: data.results,
        totalCount: data.count,
        totalPages: Math.ceil(data.count / 10),
        currentPage: page,
      };
    } catch (error) {
      console.error("Failed to fetch trip types:", error);
      return {
        TripTypes: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
      };
    }
  }

  static async get(slug) {
    const url = APIService.baseUrl + `api/admin/trip-type/${slug}/`;
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
      const tripType = await response.json();

      return tripType;
    } catch (error) {
      console.error("Failed to fetch trip type:", error);
      return null;
    }
  }

  static async update(slug, data, mediaChanged = false) {
    console.log("Update API called");

    const url = APIService.baseUrl + `api/admin/trip-type/${slug}/`;

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
            Authorization: LocalStorage.getAccesToken(),
          },
          body: JSON.stringify(filteredData),
        };
      }

      let response = await fetch(url, requestOptions); 

 if (APIService.isUnauthenticated(response.status)) {
        const hasRefreshed = await APIService.refreshToken();
        if (hasRefreshed === true) {
          return this.update(slug, data, mediaChanged);
        }
      }
      if (!response.ok) {
        console.error("Failed to update trip type:", await response.text());
        return false;
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating trip type:", error);
      return false;
    }
  }

  static async add(data) {
    const url = APIService.baseUrl + "api/admin/trip-type/";
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
      console.error("Failed to add trip type:", error);
      return null;
    }
  }

  static async delete(slug) {
    const url = APIService.baseUrl + `api/admin/trip-type/${slug}/`;

    try {
      let response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: LocalStorage.getAccesToken(),
        },
      });

        if (APIService.isUnauthenticated(response.status)) {
  const hasRefreshed = await APIService.refreshToken();
  if (hasRefreshed === true) {
    return this.delete(slug);
  } } 
      return false;
    } catch (error) {
      console.error(`Failed to delete trip type with slug ${slug}:`, error);
      return false;
    }
  }
}

export default TripTypeServices;
