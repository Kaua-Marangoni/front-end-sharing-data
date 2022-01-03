import axios from "axios"

const apiSharingData = axios.create({
  baseURL: "https://test-api-sharing-data.herokuapp.com/"
})

export default apiSharingData
