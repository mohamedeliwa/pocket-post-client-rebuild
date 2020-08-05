import Head from "next/head";
import { useState } from "react";
import { Container, Tabs, Tab, Image } from "react-bootstrap";
import UserCard from "../../components/UserCard";
import SettingForm from "../../components/SettingForm";
import WithAuth from "../../components/WithAuth";

const Settings = () => {
  const [key, setKey] = useState("profile");

  return (
    <Container>
      <Head>
        <title>Pocket-Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserCard />
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
            <SettingForm label="First Name" inputType="text" />
            <SettingForm label="Last Name" inputType="text" />
            <SettingForm label="Caption" inputType="text" />
          </Container>
        </Tab>
        <Tab eventKey="account" title="Account">
          <br />
          <Container>
            <SettingForm label="Email Address" inputType="email" />
            <SettingForm label="Password" inputType="password" />
          </Container>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default WithAuth(Settings);
