const Province = require('../../Models/province')
const District = require('../../Models/district')
const Wards = require('../../Models/wards')


module.exports.province = async (req, res) => {
	try {
		const province = await Province.find()
		let data = [];
		province.map(it => {
			const dataConvert = {
				label: it.name,
				value: it.province_id
			}
			data.push(dataConvert)
		})
		res.status(200).json({ message: 'Successfully!', data: data, code: 200 })
	} catch (error) {
		res.status(200).json({ message: 'error!', data: [], code: 201 })
	}

}

module.exports.district = async (req, res) => {
	try {
		const { province_id } = req.query
		if (province_id) {
			const district = await District.find({ province_id })
			let data = [];
			district.map(it => {
				const dataConvert = {
					label: it.name,
					value: it.district_id
				}
				data.push(dataConvert)
			})
			res.status(200).json({ message: 'Successfully!', data: data, code: 200 })
		} else {
			res.status(200).json({ message: 'error!', data: [], code: 201 })
		}

	} catch (error) {
		res.status(400).json({ error })
	}
}


module.exports.wards = async (req, res) => {
	try {
		const { district_id } = req.query
		if (district_id) {
			const wards = await Wards.find({ district_id })
			let data = [];
			wards.map(it => {
				const dataConvert = {
					label: it.name,
					value: it.wards_id
				}
				data.push(dataConvert)
			})
			res.status(200).json({ message: 'Successfully!', data: data, code: 200 })
		} else {
			res.status(200).json({ message: 'error!', data: [], code: 201 })
		}

	} catch (error) {
		res.status(400).json({ error })
	}

}