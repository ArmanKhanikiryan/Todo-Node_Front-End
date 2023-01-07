import {useEffect, useState} from "react";

const App = () => {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        fetch('http://localhost:3010/todos')
            .then(res => res.json())
            .then(data => {
                setTodos(data)
            })
    }, [])

    const [inputVal, setInputVal] = useState('')

    const handleAdd = () => {
        fetch('http://localhost:3010/todos', {
            method: "POST",
            headers: {'Content-Type' : "application/json"},
            body: JSON.stringify({
                title: inputVal
            })
        }).then(res => res.json()).then(res => setTodos(res))
        setInputVal('')
    }

    const handleCheckbox = (_id) => {
        fetch('http://localhost:3010/todos', {
            method: "PUT",
            headers: {'Content-Type' : "application/json"},
            body: JSON.stringify({
                _id
            })
        }).catch(e => console.log(e)).then(res => res.json()).then(res => setTodos(res))
    }

    const handleDelete = (_id) => {
        fetch('http://localhost:3010/todos', {
            method: "DELETE",
            headers: {'Content-Type' : "application/json"},
            body: JSON.stringify({
                _id
            })
        }).then((res) => res.json()).then((res) => setTodos(res))
    }



    return (
        <div>
            <input value={inputVal} onChange={(evt) => setInputVal(evt.target.value)} type="text"/>
        <button disabled={!inputVal.trim()} onClick={handleAdd}>Add Todo</button>

            {todos.length ? todos.map(elem => {
                return <div key={elem._id}>
                    <h1>{elem.title}</h1>
                    <button onClick={() => handleDelete(elem._id)}>Delete</button>
                    <input type="checkbox" onChange={() => handleCheckbox(elem._id)} checked={elem.isChecked}/>
                </div>
            }) : null}
        </div>
    )
}


export default App;