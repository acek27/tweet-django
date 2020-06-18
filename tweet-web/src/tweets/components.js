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
    return action.type === 'like' ? <button className={className}>{tweet.likes} Likes</button> : null
}


export function Tweet(props) {
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