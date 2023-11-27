import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

import userAPI from "../Api/userAPI";
import Pagination from "../Shared/Pagination";
import Search from "../Shared/Search";
import CustomTable from "../CustomTable/CustomTable";

function UserCus(props) {
  const [filter, setFilter] = useState({
    permission: "6087dcb5f269113b3460fce4",
    page: "1",
    limit: "4",
    search: "",
    status: true,
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
      title: "Action",
      key: "action",
      render: (_, value) => {
        return (
          <div className="d-flex">
            <Link
              to={"user/update/" + value._id}
              className="btn btn-success mr-1"
            >
              Update
            </Link>

            <button
              type="button"
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => handleDelete(value)}
              className="btn btn-danger"
            >
              Delete
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
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Customer</h4>
                <Search handlerSearch={handlerSearch} />

                <Link to="/customer/create" className="btn btn-primary my-3">
                  New create
                </Link>
                <CustomTable
                  columns={columns}
                  dataSource={users}
                  totalPage={totalPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted">
        All Rights Reserved by BULI. Designed and Developed by{" "}
        <a href="https://www.facebook.com/NguyenThanhHai.2k1">Hải Nguyễn</a>.
      </footer>
    </div>
  );
}

export default UserCus;
