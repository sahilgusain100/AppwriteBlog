import React, { useState, useEffect } from 'react'
import appwriteService from "../appWrite/config"
import { Container, PostCard } from '../Components'

const AllPosts = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className="w-full bg-gray-950 py-12 min-h-[70vh]">

            <Container>

                {/* Heading */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-white">
                        All Posts
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Explore the latest posts from MegaBlog.
                    </p>
                </div>

                {/* Posts */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {posts.map((post) => (
                            <PostCard
                                key={post.$id}
                                $id={post.$id}
                                title={post.title}
                                featuredImage={post.featuredImage}
                            />
                        ))}

                    </div>
                ) : (
                    <div className="flex justify-center py-20">
                        <p className="text-gray-400 text-lg">
                            No posts available.
                        </p>
                    </div>
                )}

            </Container>

        </div>
    )
}

export default AllPosts