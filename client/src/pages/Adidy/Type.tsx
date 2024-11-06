import Button from "@components/Button";
import Confirm from "@components/Confirm";
import InputNew from "@components/InputNew";
import Modal from "@components/Modal";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@utils/api";
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

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
        className="bg-white p-4 min-w-[30vw]"
      >
        <InputNew
          label="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="text-end mt-4">
          <Button className="bg-primary text-white">save</Button>
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
        name: "Name",
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
                  api.delete("/adidy/type/" + row._id).then(() => {
                    fetch();
                  });
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
          <Button className="bg-primary text-white">New</Button>
        </AdMOdal>
      </div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AdidyType;
