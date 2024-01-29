// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: "123",
    // Keys within public, will be also exposed to the client-side
    public: {
      API: process.env.API || "default_api_url",
      otherUrl: process.env.OTHER_URL || "default_other_url"
    }
  }
  
})
