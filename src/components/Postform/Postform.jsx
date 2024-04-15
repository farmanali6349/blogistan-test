import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Button } from "../index"
import Contenteditor from './Contenteditor';
import databaseService from '../../appwrite/config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./Postform.css"

function Postform({ post }) {

    const userData = useSelector(state => state.userData);
    const navigate = useNavigate();

    const { register, handleSubmit, watch, setValue, formState: { errors }, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            featureImage: post?.featureImage || "661beaf18e5a4b3b6df4",
            featuredImageSource: post?.featuredImageSource || "",
            status: post?.status || "active"
        }
    });
    const options = ["active", "inactive"]
    const [imageSource, setImageSource] = useState(getValues("featuredImageSource"))


    const createSlug = useCallback(function (value) {
        if (value && typeof (value) === 'string') {
            const slug = value
                .trim()
                .toLowerCase()
                .replace(/\s+/g, '-')           // Replace spaces with dash
                .replace(/[^\w-]/g, '')     // Remove non-word characters except dash
                .replace(/--+/g, '-')       // Replace multiple dashes with single dash
                .replace(/^-+|-+$/g, '');
            return slug;
        }

        return ''
    }, [])


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue("slug", createSlug(value.title))
            }
        })

        return () => subscription.unsubscribe();
    }, [setValue, watch, createSlug])

    const handlePostform = async (data) => {

        if (post) {

            console.log("Data Received", data)
            console.log("User Data", userData)

            if (data.image) {
                await databaseService.deleteFile(post.featuredImage);
            }

            if (post.$id !== data.slug) {
                try {
                    await databaseService.deletePost(post.$id)
                    .catch((err) => console.log("post is not deleted."))
                } catch (error) {
                    console.log("Previous post is not deleted.")
                }
                
                const dbPost = await databaseService.createPost({ ...data, userId: userData.$id })
                if(dbPost) {
                    console.log(`Updated with new post creation.`)
                    navigate(`/post/${dbPost.$id}`)
                }
            } else {
                if (data.image) {
                    const imageFile = await databaseService.uploadFile(data.image[0]);
                    
                    if (imageFile) {
                        data.featureImage = imageFile.$id;
                    }
                }
                
                const dbPost = await databaseService.updatePost({ ...data, userId: userData.$id})
                
                if (dbPost) {
                    console.log(`Updated post.`)
                    navigate(`/post/${dbPost.$id}`)
                }
            }

        } else {
            // Create Post
            console.log("Create Post From Data: ", data)
            if(data.image) {
                const imageFile = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null;
                if (imageFile) {
                    data.featuredImage = imageFile.$id;
                }
            }

            const dbPost = await databaseService.createPost({ ...data, userId: userData.$id })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
                console.log("DB Post", dbPost);
            }
        }
    }

    return (

        <form className="post-form" onSubmit={handleSubmit(handlePostform)}>
            <Input
                type="text"
                label="Title"
                placeholder="Enter Post Title"
                className="input stroke"
                error= {errors && errors.title}
                onInput={(e) => setValue("slug", createSlug(e.target.value))}
                {...register("title", {
                    required: true
                })}
            />

            <Input
                type="text"
                label="Slug"
                placeholder=""
                className="input stroke"
                error= {errors && errors.slug}
                onInput={(e) => setValue("slug", createSlug(e.target.value))}
                {...register("slug", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^.{1,35}$/g.test(value) || "Slug should have less 36 characters."
                    }
                })}
            />

            <Contenteditor name="content" control={control} label="Blog Content" defaultValue={getValues("content")} />

            <Input
                type="file"
                className='stroke input'
                label="Featured Image"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                disabled={true}
                error="Due to database issue, uploading featured image is still unavailable."
                {...register("image", {
                    required: false
                })}

            />

            <Input
                type="url"
                placeholder="Enter source of image e.g from Pixabay"
                className="input stroke"
                label="Featured Image (Image Source)"
                error= {errors && errors.featuredImageSource}
                onInput={(e) => setImageSource(e.target.value)}
                {...register("featuredImageSource", {required: false})}
            />

            {imageSource && <img src={imageSource} width="200px" height="200px" className='stroke' />}

            <Select
                label="Status"
                options={options}
                {...register("status", { required: true })}
            />

            <Button type="submit" className='button w-100'>{post ? "Update" : "Publish"}</Button>

        </form>
    )
}

export default Postform