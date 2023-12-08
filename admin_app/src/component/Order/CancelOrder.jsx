import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import queryString from "query-string";

import orderAPI from "../Api/orderAPI";
import Pagination from "../Shared/Pagination";
import Search from "../Shared/Search";
import CustomTable from "../CustomTable/CustomTable";

function CancelOrder(props) {
  const [filter, setFilter] = useState({
    page: "1",
    limit: "4",
    search: "",
    status: "5",
  });

  const [order, setOrder] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [totalMoney, setTotalMoney] = useState();

  useEffect(() => {
    const query = "?" + queryString.stringify(filter);
    let money = 0;
    const fetchAllData = async () => {
      const od = await orderAPI.getAPI(query);
      const newArray = od.orders.map((it) => {
        it.phone = it.id_note.phone;
        it.email = it.id_user?.email || "";
        it.status = (() => {
          switch (it.status) {
            case "1":
              return "Đang xử lý";
            case "2":
              return "Đã xác nhận";
            case "3":
              return "Đang giao";
            case "4":
              return "Hoàn thành";
            default:
              return "Đơn bị hủy";
          }
        })();
        it.pay = it.pay === true ? "Đã thanh toán" : "Chưa thanh toán";
        it.total =
          new Intl.NumberFormat("vi-VN", {
            style: "decimal",
            decimal: "VND",
          }).format(it.total) + " VNĐ";
        return it;
      });
      setTotalPage(od.totalPage);
      setOrder(newArray);
      setTotalMoney(od.totalMoney);
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
  const columns = [
    {
      title: "Tên",
      dataIndex: "full_name",
      key: "full_name",
      width: "150px",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: "130px",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: "270px",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "create_time",
      key: "create_time",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      width: "150px",
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "pay",
      key: "pay",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, value) => {
        return (
          <div className="d-flex">
            <Link
              to={"/order/detail/" + value._id}
              className="btn btn-info mr-1"
            >
              Chi tiết
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
                <h4 className="card-title">Đơn hàng đã hủy</h4>
                <CustomTable
                  columns={columns}
                  dataSource={order}
                  totalPage={totalPage}
                  filter={filter}
                  setFilter={setFilter}
                />
                <h4 className="card-title" style={{ marginTop: "20px" }}>
                  Tổng tiền:{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "decimal",
                    decimal: "VND",
                  }).format(totalMoney) + " VNĐ"}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted">
        All Rights Reserved by BULI. Designed and Developed by
        <a href="https://www.facebook.com/NguyenThanhHai.2k1">Hải Nguyễn</a>.
      </footer>
    </div>
  );
}

export default CancelOrder;
