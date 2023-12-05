import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

import permissionAPI from "../Api/permissionAPI";
import Pagination from "../Shared/Pagination";
import Search from "../Shared/Search";
import CustomTable from "../CustomTable/CustomTable";
import MessageNotify from "../Message/Message";

function Permission(props) {
  const [filter, setFilter] = useState({
    page: "1",
    limit: "4",
    search: "",
    status: true,
  });

  const [permission, setPermission] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [messageObj, setMessageObj] = useState({
    type: "",
    content: "",
  });
  useEffect(() => {
    const query = "?" + queryString.stringify(filter);

    const fetchAllData = async () => {
      const ct = await permissionAPI.getAPIPage(query);
      // const newArray = ct.users.map((it) => {
      //     it.permission = it.id_permission.permission;
      //     return it;
      //   });
      setTotalPage(ct.totalPage);
      setPermission(ct.permission);
    };

    fetchAllData();
  }, [filter]);

  const onPageChange = (value) => {
    setFilter({
      ...filter,
      page: value,
    });
  };

  const handlerSearch = (value) => {
    setFilter({
      ...filter,
      page: "1",
      search: value,
    });
  };

  const handleDelete = async (value) => {
    const query = "?" + queryString.stringify({ id: value._id });

    const response = await permissionAPI.delete(query);

    if (response.msg === "Thanh Cong") {
      setFilter({
        ...filter,
        status: !filter.status,
      });
      setMessageObj({
        type: "success",
        content: "Bạn đã xóa thành công",
        active: new Date() * 1,
      });
    }
  };
  const columns = [
    {
      title: "Quyền",
      dataIndex: "permission",
      key: "permission",
    },
    {
      title: "Action",
      key: "action",
      render: (_, value) => {
        return (
          <div className="d-flex">
            <Link
              to={"/permission/update/" + value._id}
              className="btn btn-success mr-1"
            >
              Cập nhật
            </Link>

            <button
              type="button"
              onClick={() => handleDelete(value)}
              style={{ cursor: "pointer", color: "white" }}
              className="btn btn-danger"
            >
              Xóa
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Quyền</h4>
                <Search handlerSearch={handlerSearch} />

                <Link to="/permission/create" className="btn btn-primary my-3">
                  Tạo mới
                </Link>

                <CustomTable
                  columns={columns}
                  dataSource={permission}
                  totalPage={totalPage}
                  filter={filter}
                  setFilter={setFilter}
                />
              </div>
            </div>
          </div>
        </div>
        <MessageNotify
          type={messageObj.type}
          content={messageObj.content}
          active={messageObj.active}
        />
      </div>
      <footer className="footer text-center text-muted">
        All Rights Reserved by BULI. Designed and Developed by{" "}
        <a href="https://www.facebook.com/NguyenThanhHai.2k1">Hải Nguyễn</a>.
      </footer>
    </div>
  );
}

export default Permission;
