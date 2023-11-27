import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import queryString from "query-string";

import productAPI from "../Api/productAPI";
import Pagination from "../Shared/Pagination";
import Search from "../Shared/Search";
import CustomTable from "../CustomTable/CustomTable";

function Product() {
  const [filter, setFilter] = useState({
    page: "1",
    limit: "5",
    search: "",
    status: true,
  });

  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    const query = "?" + queryString.stringify(filter);

    const fetchAllData = async () => {
      const response = await productAPI.getAPI(query);
      const newArray = response.products.map((it) => {
        it.price_product =
          new Intl.NumberFormat("vi-VN", {
            style: "decimal",
            decimal: "VND",
          }).format(it.price_product) + " VNĐ";
        it.category = it.id_category.category;
        return it;
      });
      setProducts(newArray);
      setTotalPage(response.totalPage);
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

  const handleDelete = async (value) => {
    const data = {
      id: value,
    };
    const query = "?" + queryString.stringify(data);

    const response = await productAPI.delete(query);

    if (response.msg === "Thanh Cong") {
      setFilter({
        ...filter,
        status: !filter.status,
      });
    }
  };
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name_product",
      key: "name_product",
    },
    {
      title: "Giá",
      dataIndex: "price_product",
      key: "price_product",
    },
    {
      title: "Ảnh",
      key: "image",
      render: (_, value) => (
        <img src={value.image} alt="" style={{ width: "60px" }} />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "describe",
      key: "describe",
    },
    {
      title: "Loại",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Action",
      key: "action",
      render: (_, value) => {
        return (
          <div className="d-flex">
            <Link
              to={"/product/update/" + value._id}
              className="btn btn-success mr-1"
            >
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
                <h4 className="card-title">Products</h4>
                <Search handlerSearch={handlerSearch} />

                <Link to="/product/create" className="btn btn-primary my-3">
                  New create
                </Link>

                <CustomTable
                  columns={columns}
                  dataSource={products}
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

export default Product;
