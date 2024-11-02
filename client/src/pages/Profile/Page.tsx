import Button from "@components/Button";
import Input from "@components/Input";
import api from "@utils/api";
import { APP_OPTIONS } from "@utils/constant";
import { FC, useState } from "react";

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

  const setPermissionHandler = (name: Perm, val: string) => {
    const selectedPerm = permission[name] || [];
    const check = selectedPerm?.indexOf(val);
    if (check === -1) {
      setPermission({ ...permission, [name]: [...selectedPerm, val] });
    } else {
      setPermission({
        ...permission,
        [name]: selectedPerm.filter((v) => v !== val),
      });
    }
  };

  const submit = () => {
    api.post("/profile", { name, permission }).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="bg-white h-full p-4">
      <div className="flex justify-between">
        <div>
          <Input
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <Button
          onClick={() => submit()}
          className="bg-primary text-white max-w-[200px]"
        >
          Create
        </Button>
      </div>
      <p className="text-lg my-3">Permission</p>
      <div>
        <div className="grid grid-cols-5">
          <p>Option</p>
          <p className="text-center">Lecture</p>
          <p className="text-center">Ecrire</p>
          <p className="text-center">Modification</p>
          <p className="text-center">Suppression</p>
        </div>

        {APP_OPTIONS.map((opt, i) => {
          return (
            <div className="grid grid-cols-5 hover:bg-bg py-4" key={i}>
              <p>{opt}</p>
              <p className="text-center">
                <input
                  type="checkbox"
                  checked={permission.GET?.indexOf(opt) !== -1}
                  onChange={() => setPermissionHandler("GET", opt)}
                />
              </p>
              <p className="text-center">
                <input
                  type="checkbox"
                  checked={permission.POST?.indexOf(opt) !== -1}
                  onChange={() => setPermissionHandler("POST", opt)}
                />
              </p>
              <p className="text-center">
                <input
                  type="checkbox"
                  checked={permission.PATCH?.indexOf(opt) !== -1}
                  onChange={() => setPermissionHandler("PATCH", opt)}
                />
              </p>
              <p className="text-center">
                <input
                  type="checkbox"
                  checked={permission.DELETE?.indexOf(opt) !== -1}
                  onChange={() => setPermissionHandler("DELETE", opt)}
                />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePage;
