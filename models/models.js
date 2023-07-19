class Model {
   static apiURL = process.env.NEXT_PUBLIC_API_URL
   static apiOrigin = process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL : 'http://localhost:3000/api/'

   static errorHandler(e) {
		let statusText, statusCode
		try {
			statusText = e.response.statusText
			statusCode = e.response.status
		} catch (error) {}

		let resp = {
			statusCode: statusCode,
			success: false,
			errors: {},
		}
		try {
			let data = e.response.data

			// terjemahkan error general
			if (data.error) {
				resp.errors.general = data.error
			}

			// terjemahkan errors field
			for (const key in data.errors) {
				resp.errors[key] = data.errors[key].join("\n")
			}

			if (Object.keys(resp.errors).length === 0) {
				resp.errors.general = statusText
			}
		} catch (e2) {
			resp.errors.general = "Failed"
		}
		return resp
	}
}

export default Model