import { useContext } from "react";
import { NavigationUxValueContext } from "./navigationUxValueContext";

function useNavigationUx() {
  return useContext(NavigationUxValueContext);
}

export { useNavigationUx };
