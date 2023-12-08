import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import queryString from "query-string";

import orderAPI from "../Api/orderAPI";
import Pagination from "../Shared/Pagination";
import Search from "../Shared/Search";
import CustomTable from "../CustomTable/CustomTable";

function Delivery(props) {
  const [filter, setFilter] = useState({
    page: "1",
    limit: "4",
    status: "2",
    change: true,
  });

  const [order, setOrder] = useState([]);
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    const query = "?" + queryString.stringify(filter);

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
      console.log(od);
      setTotalPage(od.totalPage);
      setOrder(newArray);
    };

    fetchAllData();
  }, [filter]);

  const onPageChange = (value) => {
    setFilter({
      ...filter,
      page: value,
    });
  };

  const handleConfirm = async (value) => {
    const query = "?" + queryString.stringify({ id: value._id });

    const response = await orderAPI.delivery(query);

    if (response.msg === "Thanh Cong") {
      setFilter({
        ...filter,
        change: !filter.change,
      });
    }
  };

  const handleCancel = async (value) => {
    const query = "?" + queryString.stringify({ id: value._id });

    const response = await orderAPI.cancelOrder(query);

    if (response.msg === "Thanh Cong") {
      setFilter({
        ...filter,
        change: !filter.change,
      });
    }
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
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

            <button
              type="button"
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => handleConfirm(value)}
              className="btn btn-success mr-1"
            >
              Xác nhận
            </button>

            {!value.pay && (
              <button
                type="button"
                style={{
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={() => handleCancel(value)}
                className="btn btn-danger"
              >
                Hủy bỏ
              </button>
            )}
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
                <h4 className="card-title">Vận chuyển</h4>

                <CustomTable
                  columns={columns}
                  dataSource={order}
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
        All Rights Reserved by BULI. Designed and Developed by
        <a href="Hải Nguyễn">Hải Nguyễn</a>.
      </footer>
    </div>
  );
}

export default Delivery;
