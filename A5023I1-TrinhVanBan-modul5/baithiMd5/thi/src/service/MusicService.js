import axios from "axios";

export const getAllMusic = async () =>{
    try{
        const temp = await axios.get('http://localhost:8000/musics')
        return temp.data
    }catch (e){
        console.log(e + "error");
    }
}

export const getAllState = async () =>{
    try{
        const temp = await axios.get('http://localhost:8000/states')
        return temp.data
    }catch (e){
        console.log(e);
    }
}
export const saveMusic = async (value) => {
    try{
        await axios.post('http://localhost:8000/musics', value)
            .catch(err => console.log(err));
    }catch (e){
        console.log(e);
    }
};


export const searchMusic = async (name = '') => {
    try {
        const response = await axios.get('http://localhost:8000/musics', {
            params: {
                _sort: 'product.name',
                'ten_like': name,
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};


