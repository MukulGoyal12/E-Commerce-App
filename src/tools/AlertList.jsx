import { withAlert } from "../providers/withHOC";
import Alert from "./Alert";

const AlertList = ({ alert }) => {
  return (
    <div className="absolute top-5 left-5 flex flex-col gap-5 z-10">
      {Object.keys(alert).map((id) => (
        <Alert
          key={id}
          id={id}
          message={alert[id].message}
          type={alert[id].type}
        />
      ))}
    </div>
  );
};

export default withAlert(AlertList);
