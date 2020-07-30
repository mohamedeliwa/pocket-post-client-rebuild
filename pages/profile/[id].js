import Head from "next/head";
import { useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import UserCard from "../../components/UserCard";
import SettingForm from "../../components/SettingForm";

const Profile = () => {
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
            <SettingForm label="First Name" inputType="text" />
            <SettingForm label="Last Name" inputType="text" />
            <SettingForm label="Caption" inputType="text" />
            <Container style={{ padding: "1rem" }}>
              <form>
                <div class="form-group">
                  <label for="avatar">Profile Picture</label>
                  <input
                    type="file"
                    class="form-control-file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                  />
                </div>
                <button type="submit" class="btn btn-primary">Upload</button>
              </form>
            </Container>
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

export default Profile;
