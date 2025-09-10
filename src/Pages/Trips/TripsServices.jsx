import APIService from "../APIServices";
import LocalStorage from "../LocalStorage";

class TripServices {
  static async getAll(search, orderBy, page, status) {
    const url =
      APIService.baseUrl +
      `api/admin/trip/?search=${search}&ordering=${orderBy}&page=${page}&status=${status}`;

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
        Trips: data.results,
        totalCount: data.count,
        totalPages: Math.ceil(data.count / 10),
        currentPage: page,
      };
    } catch (error) {
      console.error("Failed to fetch trips:", error);
      return {
        Trips: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
      };
    }
  }

  static async get(id) {
    const url = APIService.baseUrl + `api/admin/trip/${id}/`;
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

      const trip = await response.json();

      return trip;
    } catch (error) {
      console.error("Failed to fetch trip:", error);
      return null;
    }
  }

  static async update(id, data, mediaChanged = false, ) {
    console.log("Update API called");

    const url = APIService.baseUrl + `api/admin/trip/${id}/`;

    try {
      let requestOptions;
      console.log("mediaChanged = ", mediaChanged);
      const formData = new FormData();
        for (const key in data) {
          if (data[key] !== undefined && data[key] !== null) {
            if (key === "faqs" || key === "itinerary") {
              // Send complex objects as JSON strings
              formData.append(key, JSON.stringify(data[key]));
            } else {
              formData.append(key, data[key]);
            }
          }
        }

        requestOptions = {
          method: "PUT",
          headers: {
            Authorization: LocalStorage.getAccesToken(),
          },
          body: formData,
        };

      // if (mediaChanged) {
      //   const formData = new FormData();
      //   for (const key in data) {
      //     if (data[key] !== undefined && data[key] !== null) {
      //       formData.append(key, data[key]);
      //     }
      //   }

      //   requestOptions = {
      //     method: "PUT",
      //     headers: {
      //       Authorization: LocalStorage.getAccesToken(),
      //     },
      //     body: formData,
      //   };
      // } 
      // else {
      //   const filteredData = { ...data };
      //   delete filteredData.media;

      //   requestOptions = {
      //     method: "PUT",
      //     headers: {
      //       Authorization: LocalStorage.getAccesToken(),
      //     },
      //     body: JSON.stringify(filteredData),
      //   };
      // }

      let response = await fetch(url, requestOptions);

      if (APIService.isUnauthenticated(response.status)) {
        const hasRefreshed = await APIService.refreshToken();
        if (hasRefreshed === true) {
          return this.update(id, data, mediaChanged);
        }
      }

      if (!response.ok) {
        console.error("Failed to update trip:", await response.text());
        return false;
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating trip:", error);
      return false;
    }
  }

  static async add(data) {
    const url = APIService.baseUrl + "api/admin/trip/";
    console.log("Data = ", data);

    try {
      const formData = new FormData();

      for (const key in data) {
        const value = data[key];

        if (value === undefined || value === null) continue;

        if (key === "media" && Array.isArray(value)) {
          value.forEach((file) => formData.append("media", file));
        } else if (key === "faqs" || key === "itinerary") {
          // Send complex objects as JSON strings
          formData.append(key, JSON.stringify(value));
        } else if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
        } else {
          formData.append(key, value);
        }
      }

      let response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: LocalStorage.getAccesToken(),
        },
        body: formData,
      });
      // console.log("Response = ", await response.json());
      // console.log("Response = ",response);

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
      console.error("Failed to add trip:", error);
      return null;
    }
  }

}

export default TripServices;
    