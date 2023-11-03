import axios from '../axios'

 const Categories = () => {
   return axios.get('/api/category/')
}

export {
  Categories
}