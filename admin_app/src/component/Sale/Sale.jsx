import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

import permissionAPI from "../Api/permissionAPI";
import Pagination from "../Shared/Pagination";
import Search from "../Shared/Search";
import SaleAPI from "../Api/SaleAPI";
import moment from "moment/moment";
import CustomTable from "../CustomTable/CustomTable";

function Sale(props) {
  const [filter, setFilter] = useState({
    page: "1",
    limit: "5",
    search: "",
    status: true,
  });

  const [sale, setSale] = useState([]);
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    const query = "?" + queryString.stringify(filter);

    const fetchAllData = async () => {
      const ct = await SaleAPI.getAll(query);
      const newArray = ct.sale.map((it) => {
        it.name_product = it.id_product.name_product;
        it.statusText = it.status ? "Active" : "Disable";
        it.start = moment(it.start).format("DD/MM/YYYY");
        it.end = moment(it.end).format("DD/MM/YYYY");
        return it;
      });
      setSale(newArray);
      setTotalPage(ct.totalPage);
    };

    fetchAllData();
  }, [filter]);


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
    },
    {
      title: "Giảm giá",
      dataIndex: "promotion",
      key: "promotion",
    },
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
      dataIndex: "statusText",
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
                <h4 className="card-title">Giảm giá</h4>
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
      </div>
      <footer className="footer text-center text-muted">
        All Rights Reserved by BULI. Designed and Developed by{" "}
        <a href="https://www.facebook.com/NguyenThanhHai.2k1">Hải Nguyễn</a>.
      </footer>
    </div>
  );
}

export default Sale;
