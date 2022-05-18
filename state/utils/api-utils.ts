const getHeaders = () => ({
  "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/x-www-form-urlencoded",
  "Accept": '*/*',
  "Accept-Econding": "gzip, deflate, br",
})

const apiUtils = {
  getHeaders
}
export default apiUtils