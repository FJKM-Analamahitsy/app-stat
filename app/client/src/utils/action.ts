import toast from "react-hot-toast";
import api from "./api";

export const onAddAttendance = (id: string) => {
  const conf = window.confirm("Are you sure to proceed to this action?");
  if (conf) {
    const req = api.post("/attendance/" + id);
    toast.promise(req, {
      loading: "En attente...",
      error: "error",
      success: "succes",
    });
  }
};
