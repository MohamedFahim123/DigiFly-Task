module.exports = {
  i18n: {
    locales: ["en", "ar"],
  },
  detection: {
    order: [
      "cookie",
      "htmlTag",
      "localStorage",
      "sessionStorage",
      "navigator",
      "path",
      "subdomain",
    ],
    caches: ["cookie"],
    lookupCookie: "i18next",
    lookupLocalStorage: "i18nextLng",
    lookupFromPathIndex: 0,
  },
  backend: {
    loadPath: "/locales/{{lng}}.json",
  },
};
