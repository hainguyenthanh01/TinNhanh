import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";

import categoryAPI from "../Api/categoryAPI";
import Pagination from "../Shared/Pagination";
import Search from "../Shared/Search";
import CustomTable from "../CustomTable/CustomTable";

function DetailCategory(props) {
  const [category] = useState(props.match.params.id);
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
      const response = await categoryAPI.detailProduct(category, query);
      const newArray = response.products.map((it) => {
        it.name_product = it.id_product.name_product;
        it.price_product =
          new Intl.NumberFormat("vi-VN", {
            style: "decimal",
            decimal: "VND",
          }).format(it.price_product) + " VNĐ";
        return it;
      });
      setProducts(newArray);
      setTotalPage(response.totalPage);
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
      width: "200px",
    },
    {
      title: "Giá",
      dataIndex: "price_product",
      key: "price_product",
      width: "150px",
    },
    {
      title: "Số lượng",
      dataIndex: "number",
      key: "number",
      width: "100px",
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
      title: "Hành động",
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
                <h4 className="card-title">{category}</h4>
                <Search handlerSearch={handlerSearch}/>

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
        All Rights Reserved by BULI. Designed and Developed by
        <a href="https://www.facebook.com/NguyenThanhHai.2k1">Hải Nguyễn</a>.
      </footer>
    </div>
  );
}

export default DetailCategory;
