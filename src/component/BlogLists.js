import { Link } from "react-router-dom";
import Loading from "../shimmer/Loading";
import BlogComponent from "./BlogComponent"

const BlogLists = ({ blogs }) => {
  return (
    <div className="flex flex-col gap-8">
      {
        !blogs ? (<Loading />) : (
          blogs.map((blog)=>(
            <Link to={`/blog/${blog._id}`} key={blog._id}>
              <BlogComponent blog = { blog } />
            </Link>
          ))
        )
      }
    </div>
  )
}

export default BlogLists