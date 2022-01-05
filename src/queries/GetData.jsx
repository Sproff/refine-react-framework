import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";
import {authProvider} from "services/authProvider"
import axios from "axios";

import { Users } from "components/users/Users";
import { Login } from "pages/Login";

export const GetData = () => {
  const API_URL = "https://api.fake-rest.refine.dev";

  return (
    <Refine
      authProvider={authProvider}
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL, axios)}
      resources={[{ name: "users", list: Users }]}
      LoginPage={Login}
      reactQueryDevtoolConfig={{
        initialIsOpen: false,
        position: "none",
      }}
      Layout={({ children }) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {children}
        </div>
      )}
    />
  );
};

export default GetData;
