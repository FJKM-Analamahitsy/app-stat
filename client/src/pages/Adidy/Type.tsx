import Button from "@components/Button";
import Confirm from "@components/Confirm";
import InputNew from "@components/InputNew";
import Modal from "@components/Modal";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";

interface Props {
  children: ReactNode;
  onsuccess: () => void;
  data?: any;
}

const AdMOdal: FC<Props> = ({ children, onsuccess, data }) => {
  const [name, setName] = useState(data ? data.name : "");
  const modal = useRef<any>(null);
  const submit = () => {
    if (data) {
      api.patch("/adidy/type/" + data._id, { name }).then(() => {
        modal.current.close();
        onsuccess();
        setName("");
      });
    } else {
      api.post("/adidy/type", { name }).then(() => {
        modal.current.close();
        setName("");
        onsuccess();
      });
    }
  };
  return (
    <Modal ref={modal}>
      <>{children}</>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="bg-white p-4 min-w-[30vw] rounded"
      >
        <p className="mb-4 font-medium text-lg">Karazana adidy</p>
        <InputNew
          label="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="text-end mt-4">
          <Button className="bg-primary text-white min-w-[150px]">
            <FontAwesomeIcon icon={solid("save")} className="mr-2" />{" "}
            Enregistrer
          </Button>
        </div>
      </form>
    </Modal>
  );
};

const AdidyType: FC = () => {
  const [data, setData] = useState([]);

  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        name: "Nom",
        selector: (row) => row.name,
      },
      {
        name: "Action",
        center: true,
        cell: (row) => {
          return (
            <div className="flex justify-around w-full">
              <AdMOdal onsuccess={fetch} data={row}>
                <FontAwesomeIcon icon={solid("edit")} />
              </AdMOdal>
              <Confirm
                onContinue={() => {
                  const request = api
                    .delete("/adidy/type/" + row._id)
                    .then(() => {
                      fetch();
                    });
                  toast.promise(request, {
                    loading: "En attente...",
                    success: "Données supprimées avec succès",
                    error: "Une erreur se produit.",
                  });
                  return request;
                }}
              >
                <FontAwesomeIcon icon={solid("trash")} />
              </Confirm>
            </div>
          );
        },
      },
    ],
    []
  );
  const fetch = () => {
    api.get("/adidy/type").then((res) => setData(res.data));
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="p-4 h-full bg-white">
      <div>
        <AdMOdal onsuccess={fetch}>
          <Button className="bg-primary text-white min-w-[150ox]">
            <FontAwesomeIcon icon={solid("add")} className="mr-2" />
            Nouveau
          </Button>
        </AdMOdal>
      </div>
      <div>
        <DataTable
          columns={columns}
          data={data}
          className="h-[calc(100vh-250px)] !overflow-y-auto"
        />
      </div>
    </div>
  );
};

export default AdidyType;
