import React from 'react'
import appwriteService from "../appWrite/config"
import { Link } from 'react-router-dom'

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`} className="block group">

      <div className="w-full bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:border-gray-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

        {/* Image */}
        <div className="w-full overflow-hidden">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5">

          {/* Category */}
          <p className="text-sm text-blue-400 font-medium mb-2">
            Featured Post
          </p>

          {/* Title */}
          <h2 className="text-xl font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h2>

          {/* Read More */}
          <div className="mt-4 flex items-center justify-between">

            <span className="text-sm text-gray-400">
              Read article
            </span>

            <span className="text-blue-400 font-medium group-hover:translate-x-1 transition-transform duration-300">
              Read More →
            </span>

          </div>

        </div>

      </div>

    </Link>
  )
}

export default PostCard