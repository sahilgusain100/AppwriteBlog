import React, { useCallback } from 'react'
import { useForm } from "react-hook-form"
import { Button, Input, Select } from "../index"
import appwriteService from "../../appWrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import RTE from '../RTE'

const Postform = ({ post }) => {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {

        if (post) {

            let fileId = post.featuredImage

            if (data.image && data.image[0]) {

                const file = await appwriteService.uploadFile(data.image[0])

                if (file) {
                    fileId = file.$id
                    await appwriteService.deleteFile(post.featuredImage)
                }
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                title: data.title,
                content: data.content,
                status: data.status,
                featuredImage: fileId,
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }

        } else {

            const file = await appwriteService.uploadFile(data.image[0])

            if (file) {

                const dbPost = await appwriteService.createPost({
                    ...data,
                    featuredImage: file.$id,
                    userId: userData.$id,
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-Z/d/s]+/g, '-')
                .replace(/\s/g, '-')
        } else {
            return ''
        }
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue(
                    'slug',
                    slugTransform(value.title),
                    { shouldValidate: true }
                )
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (

        <form
            onSubmit={handleSubmit(submit)}
            className="w-full"
        >

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT SIDE */}
                <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">

                    <h2 className="text-xl font-semibold text-white mb-6">
                        {post ? "Edit Post" : "Create a New Post"}
                    </h2>

                    <Input
                        label="Title"
                        placeholder="Enter your post title"
                        className="mb-5"
                        {...register("title", { required: true })}
                    />

                    <Input
                        label="Slug"
                        placeholder="post-slug"
                        className="mb-6"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue(
                                "slug",
                                slugTransform(e.currentTarget.value),
                                { shouldValidate: true }
                            )
                        }}
                    />

                    <RTE
                        label="Content"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                    />

                </div>


                {/* RIGHT SIDE */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">

                    <h2 className="text-xl font-semibold text-white mb-6">
                        Post Settings
                    </h2>

                    {/* Featured Image */}
                    <Input
                        label="Featured Image"
                        type="file"
                        className="mb-5"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />

                    {/* Existing Image */}
                    {post && (
                        <div className="w-full mb-6">

                            <p className="text-sm text-gray-400 mb-2">
                                Current Image
                            </p>

                            <div className="rounded-xl overflow-hidden border border-gray-700">
                                <img
                                    src={appwriteService.getFileView(post.featuredImage)}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                            </div>

                        </div>
                    )}

                    {/* Status */}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-6"
                        {...register("status", { required: true })}
                    />

                    {/* Submit */}
                    <Button
                        type="submit"
                        bgColor={post ? "bg-green-600" : "bg-red-600"}
                        className="w-full hover:opacity-90 transition duration-200"
                    >
                        {post ? "Update Post" : "Publish Post"}
                    </Button>

                </div>

            </div>

        </form>
    )
}

export default Postform