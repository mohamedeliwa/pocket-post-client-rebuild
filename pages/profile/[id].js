import Head from "next/head";
import { useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import UserCard from "../../components/UserCard";
import SettingForm from "../../components/SettingForm";

const Profile = () => {
  const [key, setKey] = useState("account");

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
        <Tab eventKey="account" title="Account">
          <br />
          <Container>
            <SettingForm label="Email Address" inputType="email" />
            <SettingForm label="Password" inputType="password" />
            <SettingForm label="User Name" inputType="text" />
          </Container>
        </Tab>
        <Tab eventKey="profile" title="Profile">
          <br />
          <Container>
            <SettingForm label="Email Address" inputType="email" />
            <SettingForm label="Password" inputType="password" />
            <SettingForm label="User Name" inputType="text" />
          </Container>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Profile;
