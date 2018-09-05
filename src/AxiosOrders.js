import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'https://ecburgerbuilder.firebaseio.com/'
})

export default instance;