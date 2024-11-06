import api from "@utils/api";
import { MONTHS } from "@utils/constant";
import { FC, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useParams } from "react-router-dom";

const Compta: FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [rows, setRows] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const { id } = useParams();

  const fetch = (page: number) => {
    api.get(`/adidy?page=${page}&limit=${limit}`).then((res) => {
      setData(res.data.member);
      setRows(res.data.totalRow);
    });
  };

  const onChangeHandler = (page: number) => {
    fetch(page);
  };

  const onLimitChange = (limit: number, page: number) => {
    api.get(`/adidy?page=${page}&limit=${limit}&id=${id}`).then((res) => {
      setData(res.data.member);
      setLimit(limit);
    });
  };

  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        name: "Date",
        cell: (row) => {
          return (
            <div>
              <p>{new Date(row.date).toDateString()}</p>
            </div>
          );
        },
      },
      {
        name: "Adidy",
        selector: (row) => row.type,
      },
      {
        name: "Volana",
        selector: (row) => `${MONTHS[row.month]},${row.year}`,
      },
      {
        name: "Vola",
        selector: (row) => Intl.NumberFormat("de-FR").format(row.mtt),
      },
    ],
    // eslint-disable-next-line
    []
  );
  useEffect(
    () => {
      fetch(1);
    }, // eslint-disable-next-line
    []
  );
  return (
    <div className="p-4">
      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationServer
        paginationPerPage={limit}
        paginationRowsPerPageOptions={[5, 10]}
        paginationTotalRows={rows}
        onChangePage={onChangeHandler}
        onChangeRowsPerPage={onLimitChange}
      />
    </div>
  );
};

export default Compta;
