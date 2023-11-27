import React from "react";
import { Pagination, Table } from "antd";

function CustomTable({ columns, dataSource, totalPage }) {
  return (
    <>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <div style={{ float: "right", marginTop: "30px" }}>
        <Pagination defaultCurrent={1} total={totalPage} />
      </div>
    </>
  );
}

export default CustomTable;
