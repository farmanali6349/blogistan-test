import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Container, Loading } from '../index';
import databaseService from '../../appwrite/config';
import parse from 'html-react-parser'
import { useSelector } from 'react-redux';
import "./Post.css"
function Post() {

    const { slug } = useParams();
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(useSelector(state => state.userData))
    const navigate = useNavigate();

    useEffect(() => {

        if (slug) {
            databaseService.getPost(slug)
                .then((post) => setPost(post))
                .catch((err) => console.log("post not found", err))
                .finally(() => setLoading(false))
        }
    }, [slug])

    const deletePost = async (id) => {
        databaseService.deletePost(id)
        .then(()=> navigate("/"))
        .catch((err)=> console.log("Post is not deleted, Error", err))
    }

    return (
        <>
            {!loading ? <section className="post">
                <Container>
                    {post ?
                        (
                            <>
                                <div className="feature-image">
                                    <img src={post.featuredImageSource} alt={post.title} className='stroke' />
                                </div>
                                <h2 className="post-title">{post.title}</h2>

                                {typeof post.content === 'string' ? (
                                    <div className="post-content">
                                        {parse(post.content)}
                                    </div>
                                ) : <p>No Content</p>}
                                {userData && userData.$id === post.userId ?
                                    (
                                        <>
                                            <hr />
                                            <div className="post-buttons">
                                                <Button
                                                    className='button'
                                                    onClick={() => deletePost(post.$id)}
                                                >Delete</Button>
                                                <Button className='button' onClick={() => navigate(`/edit-post/${post.$id}`)}>Edit</Button>
                                            </div>
                                        </>
                                    )
                                    : null}
                            </>
                        )
                        : (<h4 className='no-post-para'> Post Not Available </h4>)}
                </Container>

            </section> : <Loading />}
        </>
    )
}

export default Post