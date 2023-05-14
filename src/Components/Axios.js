import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

axios.get(`${apiUrl}/example`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
