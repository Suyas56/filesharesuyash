import axios from 'axios';

const API_URI = 'https://filesharesuyash.vercel.app/';

export const uploadFile = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/upload`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*'
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}
