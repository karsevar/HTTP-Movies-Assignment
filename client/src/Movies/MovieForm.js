import React, {useState, useEffect} from 'react';
import axios from 'axios';

function MovieForm(props) {
    console.log(props.match.params.id);

    const [updateMovie, setUpdateMovie] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => {
                console.log(res.data)
                setUpdateMovie({...res.data})
            }) 
            .catch(err => console.log(err)) 
    }, [])

    const updateSubmitMovie = (event) => {
        event.preventDefault();
        console.log(updateMovie)

        axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, updateMovie)
            .then(res => console.log(res))
            .catch(err => console.log(err)) 
    } 

    const handleChange = event => {
        setUpdateMovie({...updateMovie, [event.target.name]: event.target.value})
    }


    return (
        <div className='movieform-container'>
            <form onSubmit={updateSubmitMovie}>
                <input 
                    type='text'
                    name='director'
                    value={updateMovie.director}
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='metascore'
                    value={Number(updateMovie.metascore)}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='title'
                    value={updateMovie.title}
                    onChange={handleChange}
                />
                <button>Submit Changes</button>
            </form>

        </div>
    )
}

export default MovieForm;