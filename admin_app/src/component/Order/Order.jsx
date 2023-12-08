import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import queryString from "query-string";

import orderAPI from "../Api/orderAPI";
import Pagination from "../Shared/Pagination";
import Search from "../Shared/Search";
import CustomTable from "../CustomTable/CustomTable";
import MessageNotify from "../Message/Message";

const socket = io("http://localhost:8000/", {
  transports: ["websocket"],
  jsonp: false,
});
socket.connect();

function Order(props) {
  const [filter, setFilter] = useState({
    page: "1",
    limit: "5",
  });

  const [order, setOrder] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [note, setNote] = useState([]);
  const [messageObj, setMessageObj] = useState({
    type: "",
    content: "",
  });
  useEffect(() => {
    const query = "?" + queryString.stringify(filter);

    const fetchAllData = async () => {
      const od = await orderAPI.getAPI(query);
      const newArray = od.orders.map((it) => {
        it.email = it.id_user?.email || "";
        it.phone = it.id_note.phone;
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
      setOrder(newArray);
      setTotalPage(od.totalPage);
    };

    fetchAllData();
  }, [filter]);

  //Hàm này dùng để nhận socket từ server gửi lên
  useEffect(() => {
    //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_order
    socket.on("receive_order", (data) => {
      setNote(data);

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    });
  }, []);
  const handleDelete = async (value) => {
    const data = {
      id: value,
    };
    const query = "?" + queryString.stringify(data);

    const response = await orderAPI.delete(query);

    if (response.msg === "Thanh Cong") {
      setFilter({
        ...filter,
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
                <h4 className="card-title">Đơn hàng</h4>
                {/* {note != "" ? (
                  <h5>{note}. Trang sẽ load lại sau 4s</h5>
                ) : (
                  <div></div>
                )} */}
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
        <MessageNotify
          type={messageObj.type}
          content={messageObj.content}
          active={messageObj.active}
        />
      </div>
      <footer className="footer text-center text-muted">
        All Rights Reserved by BULI. Designed and Developed by
        <a href="https://www.facebook.com/NguyenThanhHai.2k1">Hải Nguyễn</a>.
      </footer>
    </div>
  );
}

export default Order;
