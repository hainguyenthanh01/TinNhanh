import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

import userAPI from "../Api/userAPI";
import Pagination from "../Shared/Pagination";
import Search from "../Shared/Search";
import CustomTable from "../CustomTable/CustomTable";
import MessageNotify from "../Message/Message";

function UserCus(props) {
  const [filter, setFilter] = useState({
    permission: "6087dcb5f269113b3460fce4",
    page: "1",
    limit: "5",
    search: "",
    status: true,
  });
  const [messageObj, setMessageObj] = useState({
    type: "",
    content: "",
  });
  const [users, setUsers] = useState([]);
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    const query = "?" + queryString.stringify(filter);

    const fetchAllData = async () => {
      const response = await userAPI.getAPI(query);
      const newArray = response.users.map((it) => {
        it.permission = it.id_permission.permission;
        return it;
      });
      setUsers(newArray);
      setTotalPage(response.totalPage);
    };
    fetchAllData();
  }, [filter]);
  const columns = [
    {
      title: "Name",
      dataIndex: "fullname",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Permission",
      dataIndex: "permission",
      key: "permission",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, value) => {
        return (
          <div className="d-flex">
            <Link
              to={"user/update/" + value._id}
              className="btn btn-success mr-1"
            >
              Cập nhật
            </Link>

            <button
              type="button"
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => handleDelete(value)}
              className="btn btn-danger"
            >
              Xóa
            </button>
          </div>
        );
      },
    },
  ];
  const handlerSearch = (value) => {
    setFilter({
      ...filter,
      page: "1",
      search: value,
    });
  };

  const handleDelete = async (value) => {
    const query = "?" + queryString.stringify({ id: value._id });

    const response = await userAPI.delete(query);

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

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Khách hàng</h4>
                <Search handlerSearch={handlerSearch} />

                <Link to="/customer/create" className="btn btn-primary my-3">
                  Tạo mới
                </Link>
                <CustomTable
                  columns={columns}
                  dataSource={users}
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

export default UserCus;
