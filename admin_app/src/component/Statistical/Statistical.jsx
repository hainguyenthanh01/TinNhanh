import React from "react";

const Statistics = () => {
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body d-flex justify-content-between" >
                <div style={{width: "40%"}}>
                <h4 className="card-title ml-1">Chi tiết đơn hàng</h4>
                <iframe
                  style={{
                    background: "#FFFFFF",
                    border: "none",
                    borderRadius: "2px",
                    boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
                    width: "100%",
                    height: "350px",
                  }}
                  src="https://charts.mongodb.com/charts-buli-ggnmx/embed/charts?id=654b4997-7ccb-48ff-8551-660a7adb854f&maxDataAge=60&theme=light&autoRefresh=true"
                ></iframe>
                </div>
                <div style={{width: "40%"}}>
                <h4 className="card-title ml-1">Chi tiết sản phẩm</h4>
                <iframe
                  style={{
                    background: "#FFFFFF",
                    border: "none",
                    borderRadius: "2px",
                    boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
                    width: "100%",
                    height: "350px",
                  }}
                  src="https://charts.mongodb.com/charts-buli-ggnmx/embed/charts?id=654b43ca-548b-4334-8922-14c1eb4858a9&maxDataAge=60&theme=light&autoRefresh=true"
                ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted">
        All Rights Reserved by BULI. Designed and Developed by{" "}
        <a href="https://www.facebook.com/NguyenThanhHai.2k1"> Hải Nguyễn</a>.
      </footer>
    </div>
  );
};

export default Statistics;
