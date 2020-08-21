import { createContext, useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";

const initialState = {
  isAuthenticated: true,
  user: {
    id: "",
    name: "",
    email: "",
    image: "",
  },
  token: "",
};

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [state, setState] = useState(initialState);

  // fetching user profile if he is authenticated
  // if he authenticated the jwt token will exist in the request's cookies
  useEffect(() => {
    (async () => {
      try {
        // end-point for reading profile info
        const url = "http://localhost:5000/users/profile";
        const response = await fetch(url, { credentials: "include" });
        const user = await response.json();
        if ((await response.status) === 200) {
          setState({
            isAuthenticated: true,
            user: {
              id: await user._id,
              name: `${await user.firstName} ${await user.lastName}`,
              email: await user.email,
              image: await user.image,
            },
          });
        } else {
          setState(initialState);
        }
      } catch (error) {
        setState(initialState);
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
