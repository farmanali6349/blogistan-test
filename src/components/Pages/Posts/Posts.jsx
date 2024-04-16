import React, { useEffect, useState } from 'react'
import databaseService from '../../../appwrite/config'
import { Postcard, Container, Loading } from "../../index"
import "./Posts.css"
function Posts() {

    const [allPosts, setAllposts] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        databaseService.getPosts([])
            .then((posts) => setAllposts(posts.documents))
            .catch((err) => console.log("Error :: Get Post ::", err))
            .finally(() => setLoading(false))

    }, [])

    return (
        <>
            {!loading ? (
                <section className="posts-page">
                    <Container>
                        <h1 className='page-title'>Posts</h1>
                        <div className="posts-container">
                            {allPosts && allPosts ?
                                allPosts.map((post) => <Postcard key={post.$id} $id={post.$id} title={post.title} featuredImageSource={post.featuredImageSource} />)
                                : <p className='nopost-para'>No post available</p>}
                        </div>
                    </Container>
                </section>
            ) : <Loading />}
        </>
    )
}

export default Posts