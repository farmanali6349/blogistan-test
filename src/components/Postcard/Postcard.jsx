import React from 'react'
import { Link } from 'react-router-dom'
import databaseService from "../../appwrite/config"
import "./Postcard.css"
function Postcard(
    {
        $id,
        title,
        featuredImageSource
    }
) {

    return (
            <Link to={`/post/${$id}`}>
                <div className="post-card">
                    <div className="image">
                        <img src={featuredImageSource ? featuredImageSource : "https://cdn.pixabay.com/photo/2016/11/01/18/38/background-1789175_1280.png"} alt={title} />
                    </div>
                    <div className="title">
                        <h3>{title}</h3>
                    </div>
                </div>
            </Link>
    )
}

export default Postcard