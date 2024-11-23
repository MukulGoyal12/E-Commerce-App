import React from "react";
import clsx from "clsx";
import { withAlert } from "../providers/withHOC";
import CrossSVG from "../SVG/CrossSVG";

const Alert = ({ id, message, type, removeAlert }) => {
  let bgColor = "";
  switch (type) {
    case "success":
      bgColor = "bg-green-500";
      break;
    case "error":
      bgColor = "bg-red-500";
      break;
  }

  if (!message) return null;
  return (
    <div
      className={clsx(
        "text-white p-2 rounded-md flex gap-2 items-center",
        bgColor,
      )}
    >
      {message}{" "}
      <button className="w-6 h-6" onClick={() => removeAlert(id)}>
        <CrossSVG color="#ffffff" width="2" />
      </button>
    </div>
  );
};

export default withAlert(Alert);
