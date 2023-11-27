import React, { useEffect, useState } from "react";
import CouponAPI from "../Api/CouponAPI";
import Pagination from "../Shared/Pagination";
import Search from "../Shared/Search";
import queryString from "query-string";
import { Link } from "react-router-dom";
import CustomTable from "../CustomTable/CustomTable";

function Coupon(props) {
  const [filter, setFilter] = useState({
    page: "1",
    limit: "5",
    search: "",
    status: true,
  });

  const [coupons, setCoupons] = useState([]);
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    const query = "?" + queryString.stringify(filter);

    const fetchAllData = async () => {
      const response = await CouponAPI.getCoupons(query);
      setCoupons(response.coupons);
      setTotalPage(response.totalPage);
    };
    fetchAllData();
  }, [filter]);

  const handlerSearch = (value) => {
    setFilter({
      ...filter,
      // page: '1',
      search: value,
    });
  };

  const handleDelete = async (id) => {
    const response = await CouponAPI.deleteCoupons(id);

    setFilter({
      ...filter,
      status: !filter.status,
    });
  };
  const columns = [
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      key: "count",
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
      title: "Action",
      key: "action",
      render: (_, value) => {
        return (
          <div className="d-flex">
            <Link to={"/coupon/" + value._id} className="btn btn-success mr-1">
              Update
            </Link>

            <button
              type="button"
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => handleDelete(value._id)}
              className="btn btn-danger"
            >
              Delete
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
                <h4 className="card-title">Coupons</h4>
                <Search handlerSearch={handlerSearch} />

                <Link to="/coupon/create" className="btn btn-primary my-3">
                  New create
                </Link>

                <CustomTable
                  columns={columns}
                  dataSource={coupons}
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

export default Coupon;
