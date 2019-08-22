import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, Form, Input} from 'semantic-ui-react';
import styled from 'styled-components';
import Movie from './Movie';

const FormDiv = styled.div`
    background-color: #fff;
    border: 0;
    box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.24);
    padding: 1rem;
    cursor: pointer;
    position: relative;
    margin: 1rem auto;
    max-width: 500px;
`;

function MovieForm(props) {
    console.log(props.match.params.id);

    const [updateMovie, setUpdateMovie] = useState({stars: []})
    const [updateStars, setUpdateStars] = useState([]) 

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
            .then(res => {
                console.log(res)
                setUpdateMovie({
                    id: '',
                    metascore: '',
                    stars: [],
                    title: '',
                    director: ''
                })
                props.history.push("/")
            })
            .catch(err => console.log(err)) 
    } 

    const handleChange = event => {
        setUpdateMovie({...updateMovie, [event.target.name]: event.target.value})
    }

    const handleStarsChange = (event, index) => {
        const starsArray = [...updateMovie.stars]
        starsArray[index] = event.target.value
        setUpdateMovie({
            ...updateMovie,
            stars: starsArray
        })
    }

    return (
        <FormDiv>
            {console.log(updateMovie)}
            <Form onSubmit={updateSubmitMovie}>
                <Form.Group widths='equal'>
                    <Form.Input 
                        type='text'
                        name='director'
                        value={updateMovie.director}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input 
                        type='text'
                        name='metascore'
                        value={updateMovie.metascore}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input
                        type='text'
                        name='title'
                        value={updateMovie.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                {
                    updateMovie.stars.map((movie, index) => {
                            return (
                            <Form.Group key={index}  widths='equal'>
                                <input
                                    type='text'
                                    name='star'
                                    value={updateMovie.stars[index]}
                                    onChange={event => handleStarsChange(event, index)}
                                />
                            </Form.Group>
                            )
                        })
                }
                <Button>Submit Changes</Button>
            </Form>

        </FormDiv>
    )
}

export default MovieForm;