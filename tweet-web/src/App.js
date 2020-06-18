import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';


function ActionBtn(props) {
    const {tweet, action} = props
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    return action.type === 'like' ?  <button className={className}>{tweet.likes} Likes</button> : null
}


function Tweet(props) {
    const {tweet} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return <div className={className}>
        <p>{tweet.content}</p>
        <div className='btn btn-group'>
            <ActionBtn tweet={tweet} action={{type: "like"}}/>
            <ActionBtn tweet={tweet} action={{type: "unlike"}}/>
            <ActionBtn tweet={tweet} action={{type: "retweet"}}/>
        </div>
    </div>
}

function loadTweets(callback) {
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = "http://localhost:8000/api/tweets"
    xhr.responseType = "json"
    xhr.open(method, url)
    xhr.onload = function () {
        callback(xhr.response, xhr.status)
    }
    xhr.onerror = function (e) {
        callback({"message": "The request was an error"}, 400)
    }
    xhr.send()
}

function App() {
    const [tweet, setTweets] = useState([])
    useEffect(() => {
        const myCallback = (response, status) => {
            if (status === 200) {
                setTweets(response)
            }
        }
        loadTweets(myCallback)
    }, [])
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <div>
                    {tweet.map((item, index) => {
                        return <Tweet tweet={item} key={`${index}-{item.id}`}/>
                    })}
                </div>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
