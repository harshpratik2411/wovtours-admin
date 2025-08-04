class APIService {
  static baseUrl = "https://api-stage.wovtours.com/";

  static isUnauthenticated(status) {
    return status === 401;
  }
  static isError(status) {
    // console.log("status >= 300 = ",status >= 300);
    
    return status >= 300;
  }

  static isSuccess(status) {
    return status <= 300;
  }

  static refreshToken() {
    this.baseUrl + "auth/jwt/refresh/";
    //body
    //     {
    //     "refresh":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDI4NTQ1MCwiaWF0IjoxNzU0MTk5MDUwLCJqdGkiOiJiNTEyNzAyZWI4MGM0NzY5OTY0M2I0MzA5MmJjNGQ0YyIsInVzZXJfaWQiOjF9.Wt4fawlcZT92s998iF6RXKSoUnjiBixHGRGhfzIz6fY"
    // }
    //
  }
}
export default APIService
