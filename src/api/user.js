import axios from '@/libs/api.request'
import qs from 'qs'

export const login = ({ userName, password }) => {
  const data = {
    grant_type: 'password',
    username: userName,
    password: password
  }
  return axios.request({
    url: '/oauth/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: 'app',
      password: 'app'
    },
    data: qs.stringify(data),
    method: 'post'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: '/sys/userinfo',
    method: 'get'
  })
}

export const logout = () => {
  return axios.request({
    url: '/_logout',
    method: 'post'
  })
}

export const getKey = () => {
  return axios.request({
    url: '/oauth/token_key',
    method: 'get'
  })
}

export const getUserList = (params) => {
  return axios.request({
    url: '/sys/users',
    method: 'get',
    params
  })
}

export const saveUser = (data) => {
  return axios.request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

export const delUser = (data) => {
  return axios.request({
    url: `/sys/user/${data}`,
    method: 'delete'
  })
}

export const delUserBatch = (data) => {
  return axios.request({
    url: '/sys/user/batch',
    method: 'delete',
    data
  })
}

export const getRoleList = (params) => {
  return axios.request({
    url: '/sys/groups',
    method: 'get',
    params
  })
}

export const getTicket = () => {
  console.log(1)
  return axios.request({
    url: '/wechat/ticket',
    method: 'get'
  })
}

export const qrLogin = (ticket, timestamp) => {
  return axios.request({
    url: `/wechat/qrlogin?ticket=${ticket}&_t=${timestamp}`,
    method: 'get'
  })
}
