import React from "react";
import {
  Button,
  Icons,
  List,
  Table,
  useTable,
  useLogout,
  Typography,
} from "@pankod/refine";
import { useGoogleLogout } from "react-google-login";
import { useGetIdentity } from "@pankod/refine";

export const Users = () => {
  const { data: identity } = useGetIdentity();
  const { Title } = Typography;
  const { tableProps } = useTable({
    initialSorter: [
      {
        field: "title",
        order: "asc",
      },
    ],
  });

  const { mutate: logout, isLoading } = useLogout();
  const { GoogleOutlined } = Icons;
  const clientId = `${process.env.REACT_APP_CLIENT_ID}`;

  const { signOut } = useGoogleLogout({
    onLogoutSuccess: (response) => logout(response),
    clientId,
    isSignedIn: false,
    cookiePolicy: "single_host_origin",
  });

  return (
    <div>
      <Title
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: 600,
          padding: "1rem",
          color: "#67be23",
        }}
      >
        Simple User Listing Application
      </Title>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 1.5rem",
        }}
      >
        <Title
          style={{
            fontSize: "1.2rem",
          }}
        >
          <img
            style={{ borderRadius: "50%", marginRight: "1rem", height: "60px" }}
            src={identity?.imageUrl}
            alt=""
          />
          Welcome <span style={{ color: "#67be23" }}> {identity?.name}!</span>
        </Title>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          icon={<GoogleOutlined />}
          loading={isLoading}
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      </div>
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="ID" sorter />
          <Table.Column dataIndex="firstName" title="First Name" sorter />
          <Table.Column dataIndex="lastName" title="Last name" sorter />
          <Table.Column dataIndex="email" title="Email" sorter />
          <Table.Column dataIndex="birthday" title="Birthday" sorter />
        </Table>
      </List>
    </div>
  );
};

export default Users;
