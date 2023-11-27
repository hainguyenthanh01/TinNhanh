import Cookies from 'universal-cookie';
export function getUrlParamsFromJson(data) {
	return Object.keys(data)
		.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
		.join('&')
}
export function setUserCookie(idUser) {
	var now = new Date();
	var time = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0)
	document.cookie =
		'id_user=' + idUser +
		'; expires=' + time.toUTCString() +
		'; path=/';
}
export function getUserCookie() {
	const cookies = new Cookies()
	return cookies.get('id_user') || null
}
export function removeUserCookie() {
	const cookies = new Cookies()
	return cookies.remove('id_user') || null
}