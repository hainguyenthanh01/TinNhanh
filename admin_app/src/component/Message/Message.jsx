import React, { useEffect } from 'react';
import { message } from 'antd';
const MessageNotify = ({ type = '', content, active }) => {
	const [messageApi, contextHolder] = message.useMessage();
	useEffect(() => {
		if (type === 'success') {
			messageApi.open({
				type: 'success',
				content: content,
			});
		}
		if (type === 'error') {
			messageApi.open({
				type: 'error',
				content: content,
				duration: 3
			});
		}
	}, [active])
	return (
		<>
			{contextHolder}
		</>
	);
};
export default MessageNotify;