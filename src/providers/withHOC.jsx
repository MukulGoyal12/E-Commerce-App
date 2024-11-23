import { useContext } from "react";
import { UserContext, AlertContext, CartContext } from "./Contexts";

const withHOC = (Context) => (Component) => (props) => {
  const context = useContext(Context);
  return (
    <Context.Consumer>
      {(context) => <Component {...props} {...context} />}
    </Context.Consumer>
  );
};

export const withUser = withHOC(UserContext);
export const withAlert = withHOC(AlertContext);
export const withCart = withHOC(CartContext);
