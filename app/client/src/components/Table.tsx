import { FC } from "react";
import DataTable, { TableProps } from "react-data-table-component";

interface Props extends TableProps<any> {}

const Table: FC<Props> = (props) => {
  return (
    <DataTable
      {...props}
      paginationComponentOptions={{
        rowsPerPageText: "Resultas",
        rangeSeparatorText: "sur",
      }}
    />
  );
};

export default Table;
