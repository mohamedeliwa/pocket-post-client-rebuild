import { createContext, useState/*, useEffect*/ } from "react";
// import fetch from "isomorphic-unfetch";
// import { useRouter } from "next/router";

const initialState = {
  isAuthenticated: false,
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
  const [auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ auth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
