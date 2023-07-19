import axios from "../plugins/axios"
import Model from "./models"

class Pokemon {
   static async fetch(params = {}) {
      return await axios({
			method: "get",
			url: encodeURI(`${Model.apiOrigin}pokemon`),
			params: params,
			headers: {
				Accept: "application/json",
			},
		})
			.then((response) => {
				return response.data
			})
			.catch((e) => Model.errorHandler(e))
   }

   static async fetchByName(name = '') {
      return await axios({
			method: "get",
			url: encodeURI(encodeURI(`${Model.apiURL}pokemon/${name}`)),
			headers: {
				Accept: "application/json",
			},
		})
			.then((response) => {
				return response.data
			})
			.catch((e) => Model.errorHandler(e))
   }

   static async fetchByUrl(url = '') {
      return await axios({
			method: "get",
			url: encodeURI(url),
			headers: {
				Accept: "application/json",
			},
		})
			.then((response) => {
				return response.data
			})
			.catch((e) => Model.errorHandler(e))
   }

   static async fetchType() {
      return await axios({
			method: "get",
			url: encodeURI(`${Model.apiURL}type`),
			headers: {
				Accept: "application/json",
			},
		})
			.then((response) => {
				return response.data
			})
			.catch((e) => Model.errorHandler(e))
   }
   static async fetchSlugType(slug) {
      return await axios({
			method: "get",
			url: encodeURI(`${Model.apiURL}type/${slug}`),
			headers: {
				Accept: "application/json",
			},
		})
			.then((response) => {
				return response.data
			})
			.catch((e) => Model.errorHandler(e))
   }
}

export default Pokemon