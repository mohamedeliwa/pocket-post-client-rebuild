import Head from "next/head";
import { useState } from "react";
import { Container, Tabs, Tab, Image } from "react-bootstrap";
import UserCard from "../../components/UserCard";
import SettingForm from "../../components/SettingForm";
import WithAuth from "../../components/WithAuth";
import useSWR from "swr";
import Spinner from "../../components/Spinner";
import ErrorMsg from "../../components/ErrorMsg";

const Settings = () => {
  const [key, setKey] = useState("profile");
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data: user, error } = useSWR("/api/authorInfo", fetcher);
  if (error) return <ErrorMsg msg="Failed to load! , please try again later." />;
  if (!user) return <Spinner />;

  return (
    <Container>
      <Head>
        <title>Pocket-Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserCard user={user} />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="profile" title="Public Profile">
          <br />
          <Container>
            <Container style={{ padding: "1rem" }}>
              <form>
                <div className="form-group">
                  <label htmlFor="avatar">
                    <Image src="/blog/authors/jj.jpeg" rounded />
                  </label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Upload
                </button>
              </form>
            </Container>
            <SettingForm
              label="First Name"
              inputType="text"
              value={user.name}
            />
            <SettingForm label="Last Name" inputType="text" value={user.name} />
            <SettingForm
              label="Caption"
              inputType="text"
              value={user.caption}
            />
          </Container>
        </Tab>
        <Tab eventKey="account" title="Account">
          <br />
          <Container>
            <SettingForm
              label="Email Address"
              inputType="email"
              value="Jhon@example.com"
            />
            <SettingForm
              label="Password"
              inputType="password"
              value="Jhon@123456"
            />
          </Container>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default WithAuth(Settings);
