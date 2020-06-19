import React, {useEffect, useState} from "react";

import {loadTweets} from "../lookup";

export function TweetsList(props) {
    const [tweet, setTweets] = useState([])
    useEffect(() => {
        const myCallback = (response, status) => {
            if (status === 200) {
                setTweets(response)
            }
        }
        loadTweets(myCallback)
    }, [])
    return tweet.map((item, index) => {
        return <Tweet tweet={item} key={`${index}-{item.id}`}/>
    })
}

export function ActionBtn(props) {
    const {tweet, action} = props
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    let likes = tweet.likes
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay
    return <button className={className}>{display}</button>
}

export function Tweet(props) {
    const {tweet} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return <div className={className}>
        <p>{tweet.content}</p>
        <div className='btn btn-group'>
            <ActionBtn tweet={tweet} action={{type: "like", display: "Likes"}}/>
            <ActionBtn tweet={tweet} action={{type: "unlike", display: "Unlike"}}/>
            <ActionBtn tweet={tweet} action={{type: "retweet", display: "Retweet"}}/>
        </div>
    </div>
}