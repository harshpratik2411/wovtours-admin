import APIService from "../../Pages/APIServices";
import LocalStorage from "../../Pages/LocalStorage";

class HeroServices {

    static async getDashboardServices() {

        const url =
            APIService.baseUrl +
            `api/admin/dashboard-data`;

        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: LocalStorage.getAccesToken(),
                },
            });

            if (APIService.isUnauthenticated(response.status)) {
                const hasRefreshed = await APIService.refreshToken();
                if (hasRefreshed === true) {
                    return this.getDashboardServices();
                }
            }

            if (APIService.isError(response.status)) {
                const errorData = await response.json();
                alert(errorData["error"]);
                return null;
            }

            const data = await response.json();

            return data;
        } catch (error) {
            console.error("Failed to fetch trips:", error);
            return {};
        }

    }
}
export default HeroServices;