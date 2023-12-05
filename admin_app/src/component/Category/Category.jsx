import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

import categoryAPI from "../Api/categoryAPI";
import Pagination from "../Shared/Pagination";
import Search from "../Shared/Search";
import CustomTable from "../CustomTable/CustomTable";
import MessageNotify from "../Message/Message";

function Category(props) {
  const [filter, setFilter] = useState({
    page: "1",
    limit: "4",
    search: "",
    status: true,
  });
  const [messageObj, setMessageObj] = useState({
    type: "",
    content: "",
  });
  const [category, setCategory] = useState([]);
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    const query = "?" + queryString.stringify(filter);

    const fetchAllData = async () => {
      const ct = await categoryAPI.getAPIPage(query);
      setTotalPage(ct.totalPage);
      setCategory(ct.categories);
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

    const response = await categoryAPI.delete(query);

    if (response.msg === "Thanh Cong") {
      setFilter({
        ...filter,
        status: !filter.status,
      });
    }
    setMessageObj({
      type: "success",
      content: "Bạn đã xóa thành công",
      active: new Date() * 1,
    });
  };
  const columns = [
    {
      title: "Thể loại",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, value) => {
        return (
          <div className="d-flex">
            <Link
              to={"/category/" + value.category}
              className="btn btn-info mr-1"
            >
              Chi tiết
            </Link>
            <Link
              to={"/category/update/" + value._id}
              className="btn btn-success mr-1"
            >
              Cập nhật
            </Link>
            {/* <Link to={"/producer/" + value.category} className="btn btn-info mr-1">Detail</Link>
            <Link to={"/producer/update/" + value._id} className="btn btn-success mr-1">Update</Link> */}

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
                <h4 className="card-title">Thể loại</h4>
                {/* <h4 className="card-title">Producer</h4> */}
                <Search handlerSearch={handlerSearch} />

                <Link to="/category/create" className="btn btn-primary my-3">
                  Tạo mới
                </Link>
                {/* <Link to="/producer/create" className="btn btn-primary my-3">Tạo mới</Link> */}

                <CustomTable
                  columns={columns}
                  dataSource={category}
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
        <a href="#">Hải Nguyễn</a>.
      </footer>
    </div>
  );
}

export default Category;
