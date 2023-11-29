import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import queryString from "query-string";

import orderAPI from "../Api/orderAPI";
import Pagination from "../Shared/Pagination";
import Search from "../Shared/Search";
import CustomTable from "../CustomTable/CustomTable";

function DetailOrder(props) {
  const [idDetail] = useState(props.match.params.id);
  const [filter, setFilter] = useState({
    page: "1",
    limit: "4",
    search: "",
  });

  const [order, setOrder] = useState();
  const [totalPage, setTotalPage] = useState();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const res = await orderAPI.details(idDetail);
      // console.log(res)
      setOrder(res);
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const query = "?" + queryString.stringify(filter);

    const fetchAllData = async () => {
      const od = await orderAPI.detailOrder(idDetail, query);
      const newArray = od.details.map((it) => {
        it.name_product = it.id_product.name_product;
        it.price_product =
          new Intl.NumberFormat("vi-VN", {
            style: "decimal",
            decimal: "VND",
          }).format(it.id_product.price_product) + " VNĐ";
        it.total =
          new Intl.NumberFormat("vi-VN", {
            style: "decimal",
            decimal: "VND",
          }).format(it.id_order.total) + " VNĐ";
        it.image = it.id_product.image;
        return it;
      });
      setTotalPage(od.totalPage);
      setDetails(newArray);
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
      title: "Tên sản phẩm",
      dataIndex: "name_product",
      key: "name_product",
      width: "400px",
    },
    {
      title: "Giá",
      dataIndex: "price_product",
      key: "price_product",
      width: "250px",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      key: "count",
      width: "150px",
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
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      width: "250px",
    },
  ];
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title ml-1">Chi tiết đơn hàng</h4>
                {order ? (
                  <div className="mt-3 ml-1">
                    <h5>Địa chỉ: {order.address}</h5>
                    <h5>
                      Phí ship:{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "decimal",
                        decimal: "VND",
                      }).format(order.feeship) + " VNĐ"}
                    </h5>
                    <h5>
                      Tổng tiền:{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "decimal",
                        decimal: "VND",
                      }).format(order.total) + " VNĐ"}
                    </h5>
                    <h5>Phương thức thanh toán: {order.id_payment.pay_name}</h5>
                    <h5>Ngày tạo: {order.create_time}</h5>
                  </div>
                ) : (
                  <div></div>
                )}

                <CustomTable
                  columns={columns}
                  dataSource={details}
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
        <a href="https://www.facebook.com/NguyenThanhHai.2k1">Hải Nguyễn</a>.
      </footer>
    </div>
  );
}

export default DetailOrder;
