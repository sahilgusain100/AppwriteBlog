import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../Components'
import appwriteService from "../appWrite/config"
import { useSelector } from 'react-redux'

const MyPosts = () => {

    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        if (userData) {
            appwriteService.getPosts([
                appwriteService.getUserPostsQuery(userData.$id)
            ]).then((posts) => {

                if (posts) {
                    setPosts(posts.documents)
                }
            })
        }
    }, [userData])

    return (
        <div className="w-full bg-gray-950 min-h-[70vh] py-12">

            <Container>

                {/* Heading */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-white">
                        My Posts
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Manage all your posts, including active and inactive posts.
                    </p>
                </div>

                {/* Posts */}
                {posts.length > 0 ? (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {posts.map((post) => (

                            <div key={post.$id}>

                                <PostCard {...post} />

                                {/* Status */}
                                <div className="mt-2 px-1">

                                    <span
                                        className={`text-sm font-medium ${
                                            post.status === "active"
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }`}
                                    >
                                        ● {post.status}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    <div className="flex flex-col items-center justify-center py-20">

                        <p className="text-gray-400 text-lg mb-4">
                            You haven't created any posts yet.
                        </p>

                    </div>

                )}

            </Container>

        </div>
    )
}

export default MyPosts