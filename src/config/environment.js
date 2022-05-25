export function getApi() {
    const server = window.location.hostname;
    // if (process.env.NODE_ENV === "development" || server!=="poweredbar.com") {
      return "https://api.powerplaysystems.com";
    //   return "http://localhost:4000"
    // }
    // return "https://prod-ppgapi.powerplaysystems.com";
  }