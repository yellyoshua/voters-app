import React, { ReactNode } from "react";
import TableWithBrowserPagination from "react-rainbow-components/components/TableWithBrowserPagination";
import Column from "react-rainbow-components/components/Column";

type PropsTableWithPagination = {
  limit?: number;
  fields: string[];
  data: any[];
  keyField: string;
  children?: ReactNode;
}

export default function TableWithPagination({ keyField, fields = [], data = [], limit = 5, children }: PropsTableWithPagination) {

  return <div>
    <TableWithBrowserPagination
      minColumnWidth={150}
      pageSize={limit}
      data={data}
      keyField={keyField}
    >
      {
        fields.map((field, key) => (
          <Column key={key} header={field} field={field} />
        ))
      }
      {children}
    </TableWithBrowserPagination>
  </div>

}