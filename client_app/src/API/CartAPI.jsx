import { useDispatch } from 'react-redux'
import axiosClient from './axiosClient'
import { addCart } from '../Redux/Action/ActionCart'
import { getUrlParamsFromJson } from '../helper'

const Cart = {

	Get_Cart: (query) => {
		const queryParams = getUrlParamsFromJson(query)
		const url = `/api/Cart?${queryParams}`
		return axiosClient.get(url)
	},

	Post_Cart: (data) => {
		const url = '/api/Cart'
		return axiosClient.post(url, data)
	},

	Put_Cart: (query) => {
		const url = `/api/Cart${query}`
		return axiosClient.put(url)
	},

	Delete_Cart: (query) => {
		const queryParams = getUrlParamsFromJson(query)
		const url = `/api/Cart/?${queryParams}`
		return axiosClient.delete(url)
	}

}

export default Cart