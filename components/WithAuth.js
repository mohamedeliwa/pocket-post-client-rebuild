import { useContext } from "react";
import Error from "next/error";
import { AuthContext } from "../context/AuthContext";

const WithAuth = (Component) => {
  // hoc => function that returns a component

  return (props) => {
    const { isAuthenticated } = useContext(AuthContext);
    // console.log(isAuthenticated);
    return isAuthenticated === null ? null : isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Error statusCode={404} />
    );
  };
};

export default WithAuth;
