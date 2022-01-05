import { Button, Icons, useLogin, Typography } from "@pankod/refine";
import { useGoogleLogin } from "react-google-login";

const { GoogleOutlined } = Icons;
const clientId = `${process.env.REACT_APP_CLIENT_ID}`;

export const Login = () => {
  const { Title } = Typography;
  const { mutate: login, isLoading } = useLogin();

  const { signIn } = useGoogleLogin({
    onSuccess: (response) => login(response),
    clientId,
    isSignedIn: true,
    cookiePolicy: "single_host_origin",
  });

  return (
    <div>
      <div
        style={{
          background: "#fafafa",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <Title
            style={{
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: 600,
              padding: "2rem",
              color: "#67be23",
            }}
          >
            Simple User Listing Application
          </Title>
        </div>
        <div style={{  margin: "auto" }}>
          <Title
            style={{
              textAlign: "center",
              fontSize: "1rem",
              fontWeight: 300,
              padding: "3rem 0 0 0",
              color: "#67be23",
            }}
          >
            Sign in with Google
          </Title>
          <Button
            type="primary"
            size="large"
            block
            icon={<GoogleOutlined />}
            loading={isLoading}
            onClick={() => signIn()}
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};
