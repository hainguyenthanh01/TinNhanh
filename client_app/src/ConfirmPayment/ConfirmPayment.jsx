import { Button, Col, Input, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000', {
	transports: ['websocket'], jsonp: false
});
socket.connect();

function ConfirmPayment() {
	const listCard = useSelector((state) => state.Cart.listCart);

	const totalPrice = listCard && listCard.reduce((prev, curIt) => prev + (+curIt.price_product * +curIt.count) || 0, 0)
	return (<div>
		<div className="breadcrumb-area">
			<div className="container">
				<div className="breadcrumb-content">
					<ul>
						<li><a href="/">Trang chủ</a></li>
						<li className="active">Xác nhận đơn hàng</li>
					</ul>
				</div>
			</div>
		</div>
		<div className='container'  >
			<h2 style={{ fontSize: "20px", fontWeight: "500" }}>Thông tin giao hàng</h2>
			<div>
				<Row gutter={[16, 24]}>
					<Col span={12}>
						<Row gutter={[16, 24]}>

							<Col span={24}><Input placeholder="Họ và tên" /></Col>


							<Col span={18}><Input type='email' placeholder="Email" /></Col>
							<Col span={6}><Input placeholder="Số điện thoại" /></Col>

							<Col span={24}><Input placeholder="Địa chỉ" /></Col>

							<Col span={12}>
								<Select
									style={{ width: "100% " }}
									placeholder="Tỉnh/Thành Phố"
									options={[
										{ value: 'jack', label: 'Jack' },
										{ value: 'lucy', label: 'Lucy' },
										{ value: 'Yiminghe', label: 'yiminghe' },
										{ value: 'disabled', label: 'Disabled', disabled: true },
									]}
								/>
							</Col>
							<Col span={12}><Select
								style={{ width: "100% " }}
								placeholder="Quận/Huyện"
								options={[
									{ value: 'jack', label: 'Jack' },
									{ value: 'lucy', label: 'Lucy' },
									{ value: 'Yiminghe', label: 'yiminghe' },
									{ value: 'disabled', label: 'Disabled', disabled: true },
								]}
							/></Col>

							<Col span={12} className="gutter-row">
								<Select
									style={{ width: "100% " }}
									placeholder="Phường/xã"
									options={[
										{ value: 'jack', label: 'Jack' },
										{ value: 'lucy', label: 'Lucy' },
										{ value: 'Yiminghe', label: 'yiminghe' },
										{ value: 'disabled', label: 'Disabled', disabled: true },
									]}
								/></Col>


							<Col span={24}>
								<TextArea

									placeholder="Ghi chú"
									autoSize={{ minRows: 3, maxRows: 5 }}
								/></Col>


						</Row>
					</Col>
					<Col span={4} />
					<Col span={8}>
						<Row gutter={[16, 24]}>
							{listCard && listCard.map(it => (
								<Col span={24}>
									<Row>
										<Col span={4}><img width={70} height={70} src={it?.image} alt="image-product" /></Col>
										<Col span={14} style={{ padding: "0 10px" }}>
											<div style={{ textTransform: "uppercase" }}>{`${it.name_product} - ${it.size}`}</div>
											<div>x{it.count}</div>
										</Col>
										<Col span={6}>{new Intl.NumberFormat("vi-VN", {
											style: "decimal",
											decimal: "VND",
										}).format((+it.price_product * +it.count) || 0) + " VNĐ"}</Col>
									</Row>
								</Col>
							))}


							<div style={{ height: "2px", width: "100%", background: "rgba(0,0,0,0.2)" }} />
							<Col span={24}>
								<Row>
									<Col style={{ fontWeight: "500" }} span={18}>Tổng cộng</Col>

									<Col span={6}>{new Intl.NumberFormat("vi-VN", {
										style: "decimal",
										decimal: "VND",
									}).format(totalPrice) + " VNĐ"}</Col>
								</Row>
							</Col>
							<Col style={{ border: "1px solid #e98811" }} span={24}>
								Chào Anh/Chị X, đơn hàng của Anh/Chị đang trong quá trình vận chuyển nhưng sẽ chậm trễ hơn thời gian dự kiến. Chúng tôi thành thật xin lỗi về sự cố này. Đơn hàng sẽ được giao cho Anh/Chị vào thời gian ước tính là “ngày giao hàng”. Nếu có bất kỳ thắc mắc hay vấn đề cần được giải đáp, hãy liên hệ với chúng tôi qua đường dây nóng: “Số điện thoại”.
							</Col>
							<Col span={24}>
								<Row>
									<Col span={18} />

									<Col span={6}>
										<Button type="primary" style={{ background: "#fed700", color: '#242424' }}>Đặt hàng</Button>
									</Col>
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
			<h2 style={{ fontSize: "20px", fontWeight: "500", marginTop: "22px" }}>Phương thức thanh toán</h2>
		</div>

	</div>);
}

export default ConfirmPayment;