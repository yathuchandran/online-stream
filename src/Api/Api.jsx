import axios from "axios"
// //WEB URL
export let baseUrlApi = 'https://movies-jbar.onrender.com/api'

export const getLogin = async (payload) => {
    try {
      const response = await axios.post(`${baseUrlApi}/user/login`,payload);
      return response?.data;
    } catch (error) {
      console.log('getLogin ERROR',error);
    }
  };

  export const Addmovies = async (payload) => {
    try {
      const response = await axios.post(`${baseUrlApi}/movie/add `,payload);
      return response?.data;
    } catch (error) {
      console.log('Addmovie ERROR',error);
    }
  };

  export const GetAllMovies = async () => {
    try {
      const response = await axios.get(`${baseUrlApi}/movie/get`,);
      return response?.data;
    } catch (error) {
      console.log('Addmovie ERROR',error);
    }
  };

  export const get_category = async () => {
    try {
      const response = await axios.get(`${baseUrlApi}/movie/get_category`,);
      return response?.data;
    } catch (error) {
      console.log('get_category ERROR',error);
    }
  };


  export const uploadSingle = async (payload) => {
    try {
      const response = await axios.post(`${baseUrlApi}/movie/add`,payload);
      return response?.data;
    } catch (error) {
      console.log('uploadSingle ERROR',error);
    }
  };


  export const GetSingleMovie = async (id) => {
    try {
      const response = await axios.get(`${baseUrlApi}/movie/single_movie/${id}`,);
      return response?.data;
    } catch (error) {
      console.log('single_movie ERROR',error);
    }
  };

  export const EditMovies = async (formData,id) => {
    try {
      const response = await axios.put(`${baseUrlApi}/movie/edit/${id} `,formData);
      return response?.data;
    } catch (error) {
      console.log('EditMovies ERROR',error);
    }
  };

  export const keySerch = async (search) => {
    console.log(search,"=================================================================");
    try {
      const response = await axios.get(`${baseUrlApi}/movie/get_searchmovie?keyword=${search} `);
      return response?.data;
    } catch (error) {
      console.log('EditMovies ERROR',error);
    }
  };

  // http://localhost:4000/api/movie/get_searchmovie?keyword=ALIEN: ROMULUS