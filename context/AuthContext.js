import { createContext, useState/*, useEffect*/ } from "react";
// import fetch from "isomorphic-unfetch";
// import { useRouter } from "next/router";

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

  return (
    <AuthContext.Provider value={{ ...state }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
