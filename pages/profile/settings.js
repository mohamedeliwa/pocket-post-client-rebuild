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
import { useRouter } from 'next/router'

const Settings = (props) => {
  const router = useRouter()
  const { user, setUser } = useContext(AuthContext);
  const [key, setKey] = useState("profile");
  const fetcher = (url) => fetch(url).then((r) => r.json());
  // const { data: user, error } = useSWR("/api/authorInfo", fetcher);
  // if (error)
  //   return <ErrorMsg msg="Failed to load! , please try again later." />;
  // if (!user) return <Spinner />;
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
              value={user.firstName}
              updater={updater}
            />
            <SettingForm label="Last Name" inputType="text" value={user.lastName} />
            <SettingForm
              label="Caption"
              inputType="text"
              value={user.caption}
              updater={updater}
            />
          </Container>
        </Tab>
        <Tab eventKey="account" title="Account">
          <br />
          <Container>
            <SettingForm
              label="Email Address"
              inputType="email"
              value={user.email}
              updater={updater}
            />
            <SettingForm
              label="Password"
              inputType="password"
              value="Jhon@123456"
              updater={updater}
            />
          </Container>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default WithAuth(Settings);
