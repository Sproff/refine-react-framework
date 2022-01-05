import axios from "axios";

export const authProvider = {
    login({ tokenId, profileObj, tokenObj }) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${tokenId}`,
      };

      localStorage.setItem(
        "user",
        JSON.stringify({ ...profileObj, avatar: profileObj.imageUrl }),
      );
      localStorage.setItem("expiresAt", tokenObj.expires_at.toString());

      return Promise.resolve();
    },
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("expiresAt");
      return Promise.resolve();
    },
    checkError() {
      return Promise.resolve();
    },
    checkAuth() {
      const expiresAt = localStorage.getItem("expiresAt");

      if (expiresAt) {
        return new Date().getTime() / 1000 < +expiresAt
          ? Promise.resolve()
          : Promise.reject();
      }
      return Promise.reject();
    },
    getUserIdentity() {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };