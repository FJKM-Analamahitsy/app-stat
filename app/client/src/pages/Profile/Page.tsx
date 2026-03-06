import Button from "@components/Button";
import Input from "@components/Input";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import { TAB_OPTIONS } from "@utils/constant";
import MenuData from "@utils/Menu";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Permission {
  GET?: string[];
  POST?: string[];
  PATCH?: string[];
  DELETE?: string[];
}

type Perm = "GET" | "POST" | "PATCH" | "DELETE";

const ProfilePage: FC = () => {
  const [name, setName] = useState("");
  const [permission, setPermission] = useState<Permission>({
    GET: [],
    POST: [],
    PATCH: [],
    DELETE: [],
  });
  const [tabInPage, setTab] = useState<number[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const setPermissionHandler = (name: Perm[], val: string) => {
    name.forEach((n) => {
      const selectedPerm = permission[n] || [];
      const check = selectedPerm?.indexOf(val);
      if (check === -1) {
        setPermission((prev) => ({ ...prev, [n]: [...selectedPerm, val] }));
      } else {
        setPermission((prev) => ({
          ...prev,
          [n]: selectedPerm.filter((v) => v !== val),
        }));
      }
    });
  };

  const setTabHandler = (val: number) => {
    const check = tabInPage?.indexOf(val);
    if (check === -1) {
      setTab([...tabInPage, val]);
    } else {
      setTab(tabInPage.filter((v) => v !== val));
    }
  };

  const submit = () => {
    if (name !== "") {
      if (id) {
        console.log("upda");
        api
          .patch("/profile/" + id, { name, permission, tabInPage })
          .then((res) => {
            navigate("/profile");
          });
      } else {
        api.post("/profile", { name, permission, tabInPage }).then((res) => {
          navigate("/profile");
        });
      }
    }
  };

  useEffect(() => {
    if (id) {
      api.get(`/profile/${id}`).then((res) => {
        setPermission(res.data.permission);
        setName(res.data.name);
        setTab(res.data.tabInPage);
      });
    }
  }, [id]);
  return (
    <div className="bg-white h-full p-4 overflow-y-auto">
      <div className="flex justify-between">
        <div className="w-2/5">
          <Input
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <Button
          onClick={() => submit()}
          className="bg-primary text-white max-w-[200px]"
        >
          <FontAwesomeIcon icon={solid("save")} className="mr-2" />
          {id ? "Mettre à jour" : "Enregistrer"}
        </Button>
      </div>
      <div className="border border-slate-100 mt-4">
        <div className="grid grid-cols-5 bg-slate-100">
          <p className="p-4 font-medium">Option</p>
          <p className="text-center p-4 font-medium">Lecture</p>
          <p className="text-center p-4 font-medium">Ecrire</p>
          <p className="text-center p-4 font-medium">Modification</p>
          <p className="text-center p-4 font-medium">Suppression</p>
        </div>

        {MenuData.map((opt: any, i: number) => {
          const auth = opt.auth;
          return (
            <div
              className="grid grid-cols-5 hover:bg-bg py-4 border-b border-slate-100"
              key={i}
            >
              <p
                className="px-4 capitalize cursor-pointer"
                onClick={() => {
                  setPermissionHandler(
                    ["GET", "POST", "PATCH", "DELETE"],
                    auth,
                  );
                }}
              >
                {opt.label}
              </p>
              <div className="text-center h-4 relative">
                <input
                  type="checkbox"
                  checked={permission.GET?.indexOf(auth) !== -1}
                  onChange={() => setPermissionHandler(["GET"], auth)}
                  className="switch"
                />
              </div>
              <div className="text-center h-4 relative">
                <input
                  type="checkbox"
                  checked={permission.POST?.indexOf(auth) !== -1}
                  onChange={() => setPermissionHandler(["POST"], auth)}
                  className="switch"
                />
              </div>
              <div className="text-center h-4 relative">
                <input
                  type="checkbox"
                  checked={permission.PATCH?.indexOf(auth) !== -1}
                  onChange={() => setPermissionHandler(["PATCH"], auth)}
                  className="switch"
                />
              </div>
              <div className="text-center h-4 relative">
                <input
                  type="checkbox"
                  checked={permission.DELETE?.indexOf(auth) !== -1}
                  onChange={() => setPermissionHandler(["DELETE"], auth)}
                  className="switch"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="border border-slate-100 max-w-[300px] mt-4">
        <p className="font-medium bg-slate-100 p-4">Tab in page</p>
        {TAB_OPTIONS.map((opt, i) => {
          return (
            <div
              className="grid grid-cols-2 hover:bg-bg py-4 border-b border-slate-100"
              key={i}
            >
              <p className="px-4 capitalize">{opt}</p>
              <div className="text-center h-4 relative">
                <input
                  type="checkbox"
                  checked={tabInPage.indexOf(i) !== -1}
                  onChange={() => setTabHandler(i)}
                  className="switch"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePage;
