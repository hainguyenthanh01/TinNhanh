import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

import permissionAPI from "../Api/permissionAPI";
import Pagination from "../Shared/Pagination";
import Search from "../Shared/Search";
import SaleAPI from "../Api/SaleAPI";
import moment from "moment/moment";
import CustomTable from "../CustomTable/CustomTable";
import MessageNotify from "../Message/Message";

function Sale(props) {
  const [filter, setFilter] = useState({
    page: "1",
    limit: "5",
    search: "",
    status: true,
  });

  const [sale, setSale] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [messageObj, setMessageObj] = useState({
    type: "",
    content: "",
  });
  useEffect(() => {
    const query = "?" + queryString.stringify(filter);

    const fetchAllData = async () => {
      const ct = await SaleAPI.getAll(query);
      const newArray = ct.sale.map((it) => {
        it.name_product = it.id_product.name_product;
        // it.number = it.id_product.number;
        it.status = it.status ? "Active" : "Disable";
        it.start = moment(it.start).format("DD/MM/YYYY");
        it.end = moment(it.end).format("DD/MM/YYYY");
        it.image = it.id_product.image;
        return it;
      });
      setSale(newArray);
      setTotalPage(ct.totalPage);
    };

    fetchAllData();
  }, [filter]);
  const handleDelete = async (id) => {
    const response = await SaleAPI.deleteSale(id);

    setFilter({
      ...filter,
      status: !filter.status,
    });
    setMessageObj({
      type: "success",
      content: "Bạn đã xóa thành công",
      active: new Date() * 1,
    });
  };
  const handlerSearch = (value) => {
    setFilter({
      ...filter,
      page: "1",
      search: value,
    });
  };
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name_product",
      key: "name_product",
      width: "250px",
    },
    {
      title: "Ảnh",
      key: "image",
      render: (_, value) => (
        <img
          src={value.image}
          alt=""
          style={{ width: "60px", height: "60px" }}
        />
      ),
    },
    {
      title: "Giảm giá",
      dataIndex: "promotion",
      key: "promotion",
    },
    // {
    //   title: "Số lượng",
    //   dataIndex: "number",
    //   key: "number",
    // },
    {
      title: "Mô tả",
      dataIndex: "describe",
      key: "describe",
    },
    {
      title: "Bắt đầu",
      dataIndex: "start",
      key: "start",
    },
    {
      title: "Kết thúc",
      dataIndex: "end",
      key: "end",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Hành động",
      key: "action",
      render: (_, value) => {
        return (
          <div className="d-flex">
            <Link to={"/sale/" + value._id} className="btn btn-success mr-1">
              Cập nhật
            </Link>
            <button
              type="button"
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => handleDelete(value._id)}
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
                <h4 className="card-title">Sản phẩm giảm giá</h4>
                <Search handlerSearch={handlerSearch} />

                <Link to="/sale/create" className="btn btn-primary my-3">
                  Tạo mới
                </Link>

                <CustomTable
                  columns={columns}
                  dataSource={sale}
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

export default Sale;
