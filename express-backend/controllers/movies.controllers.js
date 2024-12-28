import axios from "axios";

export const getAllMovies = async (req, res) => {
    try {
        const response = await axios.get("https://dummyapi.online/api/movies");
        res.json({
            success: true,
            status: 200,
            data: response.data
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            status: 500,
            message: 'Failed to fetch movies!'
        })
    }
};

export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://dummyapi.online/api/movies/${id}`);
        res.json({
            success: true,
            status: 200,
            data: response.data
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            status: 500,
            message: 'Failed to fetch movie!'
        });
    }
};