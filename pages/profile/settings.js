import Head from "next/head";
import { useState, useContext } from "react";
import { Container, Tabs, Tab, Image } from "react-bootstrap";
import UserCard from "../../components/UserCard";
import SettingForm from "../../components/SettingForm";
import WithAuth from "../../components/WithAuth";
import useSWR from "swr";
import Spinner from "../../components/Spinner";
import ErrorMsg from "../../components/ErrorMsg";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";
import AccountSettings from "../../components/AccountSettings";

const Settings = (props) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [key, setKey] = useState("profile");
  // const [key, setKey] = useState("account");
  const [avatar, setAvatar] = useState("");
  // const fetcher = (url) => fetch(url).then((r) => r.json());
  // const { data: user, error } = useSWR("/api/authorInfo", fetcher);
  // if (error)
  //   return <ErrorMsg msg="Failed to load! , please try again later." />;
  // if (!user) return <Spinner />;
  const publicInfo = [
    "firstName",
    "lastName",
    "avatar",
    "caption",
    "publicEmail",
    "twitter",
    "facebook",
    "linkedin",
    "github",
  ];
  const accountInfo = ["email", "password", "paybalEmail"];
  const updater = async (url, key, value) => {
    try {
      const body = {};
      body[key] = value;
      const res = await fetch(url, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const user = await res.json();
      router.reload();
      return user;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAvatarChange = (e) => {
    e.preventDefault();
    setAvatar(e.target.files[0]);
  };

  const updateAvatar = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      const response = await fetch(
        "http://localhost:5000/users/profile/avatar",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (response.status === 200) {
        console.log("profile picture updated successfully!");
        router.reload();
      } else {
        throw new Error("updating profile picture failed!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="avatar">
                    <Image src={user.avatar} rounded />
                  </label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={handleAvatarChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={updateAvatar}
                >
                  Upload
                </button>
              </form>
            </Container>
            <SettingForm
              label="First Name"
              inputType="text"
              value={user.firstName}
              updater={updater}
            />
            <SettingForm
              label="Last Name"
              inputType="text"
              value={user.lastName}
              updater={updater}
            />
            <SettingForm
              label="Caption"
              inputType="text"
              value={user.caption}
              updater={updater}
            />
            <SettingForm
              label="Public Email"
              inputType="email"
              value={user.publicEmail}
              updater={updater}
            />
            <SettingForm
              label="Twitter"
              inputType="text"
              value={user.twitter}
              updater={updater}
            />
            <SettingForm
              label="Facebook"
              inputType="text"
              value={user.facebook}
              updater={updater}
            />
            <SettingForm
              label="LinkedIn"
              inputType="text"
              value={user.linkedin}
              updater={updater}
            />
            <SettingForm
              label="GitHub"
              inputType="text"
              value={user.github}
              updater={updater}
            />
          </Container>
        </Tab>
        <Tab eventKey="account" title="Account">
          <br />
          {/* <Container>
            <SettingForm
              label="Email Address"
              inputType="email"
              value={user.email}
              updater={updater}
            />
            <SettingForm
              label="Paybal Email"
              inputType="email"
              value={user.paybalEmail}
              updater={updater}
            />
            <SettingForm
              label="Password"
              inputType="password"
              placeholder="Enter your new Password!"
              updater={updater}
            />
          </Container> */}
          <AccountSettings />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default WithAuth(Settings);
