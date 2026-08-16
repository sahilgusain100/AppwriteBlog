import React, { useState, useEffect } from 'react'
import appwriteService from "../appWrite/config"
import { Container, PostCard } from '../Components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {

    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {

        if (authStatus) {
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        } else {
            setPosts([])
        }

    }, [authStatus])


    // USER IS NOT LOGGED IN
    if (!authStatus) {
        return (
            <div className="min-h-[80vh] w-full bg-gray-950 text-white">

                {/* Hero */}
                <section className="relative overflow-hidden">
                    
                    <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 via-transparent to-purple-600/10" />

                    <Container>
                        <div className="relative flex min-h-[80vh] items-center justify-center py-20">

                            <div className="w-full max-w-2xl text-center">

                                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900/80 px-4 py-2 text-sm text-gray-300 shadow-lg">
                                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                                    Welcome to our blog
                                </div>

                                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                                    Ideas worth
                                    <span className="block bg-glinear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                        reading.
                                    </span>
                                </h1>

                                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-400">
                                    Discover interesting stories, ideas and knowledge
                                    shared by our community.
                                </p>

                                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

                                    <Link
                                        to="/login"
                                        className="rounded-xl bg-blue-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500"
                                    >
                                        Start Reading
                                    </Link>

                                    <Link
                                        to="/signup"
                                        className="rounded-xl border border-gray-700 bg-gray-900 px-8 py-3.5 font-semibold text-gray-200 transition-all duration-300 hover:-translate-y-1 hover:border-gray-500 hover:bg-gray-800"
                                    >
                                        Create Account
                                    </Link>

                                </div>

                            </div>

                        </div>
                    </Container>
                </section>
            </div>
        )
    }


    // USER IS LOGGED IN BUT THERE ARE NO POSTS
    if (posts.length === 0) {
        return (
            <div className="min-h-[80vh] w-full bg-gray-950 text-white">

                <Container>
                    <div className="flex min-h-[70vh] items-center justify-center py-16">

                        <div className="w-full max-w-lg rounded-3xl border border-gray-800 bg-gray-900/70 p-10 text-center shadow-2xl">

                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/10 text-4xl">
                                📝
                            </div>

                            <h1 className="text-3xl font-bold">
                                No posts yet
                            </h1>

                            <p className="mt-4 leading-7 text-gray-400">
                                There aren't any blog posts available right now.
                                Check back later for something new to read.
                            </p>

                            <div className="mt-8">
                                <Link
                                    to="/"
                                    className="inline-block rounded-xl bg-blue-600 px-7 py-3 font-semibold transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20"
                                >
                                    Go Home
                                </Link>
                            </div>

                        </div>

                    </div>
                </Container>

            </div>
        )
    }


    // USER IS LOGGED IN AND POSTS EXIST
    return (
        <div className="min-h-screen w-full bg-gray-950 text-white">

            {/* Header */}
            <section className="relative overflow-hidden border-b border-gray-800">

                <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 via-transparent to-purple-600/10" />

                <Container>
                    <div className="relative py-14 sm:py-16">

                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                            Explore
                        </p>

                        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

                            <div>
                                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                                    Latest Posts
                                </h1>

                                <p className="mt-3 max-w-xl text-gray-400">
                                    Fresh ideas, stories and knowledge from our writers.
                                </p>
                            </div>

                            <div className="rounded-full border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-gray-400">
                                {posts.length} {posts.length === 1 ? "Post" : "Posts"}
                            </div>

                        </div>

                    </div>
                </Container>

            </section>


            {/* Posts */}
            <Container>

                <div className="py-12">

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {posts.map((post) => (
                            <div
                                key={post.$id}
                                className="group transition-all duration-300 hover:-translate-y-1"
                            >
                                <PostCard {...post} />
                            </div>
                        ))}

                    </div>

                </div>

            </Container>

        </div>
    )
}

export default Home