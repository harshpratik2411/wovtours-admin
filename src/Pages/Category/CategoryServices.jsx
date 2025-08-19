import APIService from "../APIServices";
import LocalStorage from "../LocalStorage";

class CategoryServices {
  static async getAll(search, orderBy, page, status) {
    const url =
      APIService.baseUrl +
      `api/admin/category/?search=${search}&ordering=${orderBy}&page=${page}&status=${status}`;
   
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: LocalStorage.getAccesToken(),
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        Categories: data.results,
        totalCount: data.count,
        totalPages: Math.ceil(data.count / 10),
        currentPage: page,
      };
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      return {
        Categories: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
      };
    }
  }

  static async get(id) {
    const url = APIService.baseUrl + `api/admin/category/${id}/`;
    console.log("URL called", url);

    try {
      const response = await fetch(url); // No Authorization header for GET

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const category = await response.json();

      return {
        id: category.id,
        title: category.title,
        description: category.description,
        parent_id: category.parent_id,
        media_url: category.media_url,
        status: category.status,
        created_at: category.created_at,
        updated_at: category.updated_at,
      };
    } catch (error) {
      console.error("Failed to fetch category:", error);
      return null;
    }
  }

  static async update(id, data, mediaChanged = false) {
    console.log("Update API called");

    const url = APIService.baseUrl + `api/admin/category/${id}/`;

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
        console.error("Failed to update category:", await response.text());
        return false;
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating category:", error);
      return false;
    }
  }

  static async add(data) {
    const url = APIService.baseUrl + "api/admin/category/";
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
      console.error("Failed to add category:", error);
      return null;
    }
  }

  static async delete(id) {
    const url = APIService.baseUrl + `api/admin/category/${id}/`;

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
      console.error(`Failed to delete category with id ${id}:`, error);
      return false;
    }
  }
}

export default CategoryServices;
