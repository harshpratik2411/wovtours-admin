import APIService from "../APIServices";
import LocalStorage from "../LocalStorage";

class TagServices {
  static async getAll(search, orderBy, page) {
    const url =
      APIService.baseUrl +
      `api/admin/tags/?search=${search}&ordering=${orderBy}&page=${page}`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.results.map((tag) => ({
        id: tag.id,
        name: tag.title,
        desc: tag.description,
        status: tag.status,
        created_at: tag.created_at,
        updated_at: tag.updated_at,
      }));
    } catch (error) {
      console.error("Failed to fetch tags:", error);
      return [];
    }
  }

  static async get(id) {
    const url = APIService.baseUrl + `api/admin/tags/${id}/`;
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
      console.error(`Failed to get tag with id ${id}:`, error);
      return null;
    }
  }

  static async add(data) {
    // const url = APIService.baseUrl + `api/admin/tags/`;
    // try {
    //   const response = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    //   return await response.json();
    // } catch (error) {
    //   console.error("Failed to add tag:", error);
    //   return null;
    // }
  }

  static async update(id, data) {
    const url = APIService.baseUrl + `api/admin/tags/${id}/`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: LocalStorage.getAccesToken(),
        },
        body: JSON.stringify(data),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Failed to update tag with id ${id}:`, error);
      return null;
    }
  }

  static async delete(id) {
    // const url = APIService.baseUrl + `api/admin/tags/${id}/`;
    // try {
    //   const response = await fetch(url, {
    //     method: 'DELETE',
    //   });
    //   if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    //   return true;
    // } catch (error) {
    //   console.error(`Failed to delete tag with id ${id}:`, error);
    //   return false;
    // }
  }
}

export default TagServices;
