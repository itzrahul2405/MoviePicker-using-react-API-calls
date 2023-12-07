import React, { useState } from 'react'
import './InputForm.css'

const InputForm = (props) => {
    const[title, setTitle] = useState('')
    const[text, setText] = useState('')
    const[date, setDate] = useState('')

    const titleHandler = (e) => {
        setTitle(e.target.value)
    }

    const textHandler = (e) => {
        setText(e.target.value)
    }

    const dateHandler = (e) => {
        setDate(e.target.value)
    }

    const addNewMovieHandler = (e) => {
        e.preventDefault()
        const obj = {
            'title': title, 
            'opening-text': text, 
            'release-date': date
        }
        props.addMovie(obj)

        setTitle('')
        setText('')
        setDate('')
    }


    return(
        <React.Fragment >
            <form className='input-form' onSubmit={addNewMovieHandler}>
                <label htmlFor='title'>Title: </label>
                <input type='text' id='title' placeholder='Enter Title' value={title} onChange={titleHandler}/>

                <label htmlFor='opening-text'>Opening Text: </label>
                <textarea rows={5} cols={2} type='text' id='opening-text' placeholder='Enter Opening Text' value={text} onChange={textHandler}/>

                <label htmlFor='release-date'>Release Date: </label>
                <input type='date' id='release-date' value={date} onChange={dateHandler}/>

                <button type='submit' >Add Movie</button>
            </form>
        </React.Fragment>
    );
}


export default InputForm;