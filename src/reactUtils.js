import cookies from 'js-cookie'

export const getUserToken = () => cookies.get('react-ecommerce-user')

export const getAxiosHeader = (userToken) => ({
    headers: { Authorization: `Bearer ${userToken}` }
})