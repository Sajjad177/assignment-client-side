import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import imge1 from "../assets/images/blog-1.jpg";
import imge2 from "../assets/images/blog-2.jpg";
import imge3 from "../assets/images/blog-3.jpg";
import imge4 from "../assets/images/blog-4.jpg";
import imge5 from "../assets/images/blog-5.jpg";
import imge6 from "../assets/images/blog-6.jpg";

const blogPosts = [
  {
    title:
      "How Branded Gift Sets Enhance Business Loyalty and Employee Motivation",
    views: 120,
    image: imge1,
  },
  {
    title: "How Unique Paper Clips Can Elevate Your Workspace",
    views: 12,
    image: imge2,
  },
  {
    title: "How to Start Sharing Your Journey with the World",
    views: 49,
    image: imge3,
  },
  {
    title: "How to Write a Meaningful Letter for Your Loved One",
    views: 76,
    image: imge4,
  },
  {
    title: "How to Make It Personal and Memorable",
    views: 67,
    image: imge5,
  },
  {
    title: "Creating Art to Express Your Love: A Step-by-Step Guide",
    views: 49,
    image: imge6,
  },
];

const CustomerBlogs = () => {
  return (
    <section className="bg-gray-100 py-12 font-primaryFront">
      <div className=" px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            LATEST BLOG POSTS
          </h2>
          <div className="w-20 h-1 bg-teal-600 mx-auto mt-2"></div>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="relative overflow-hidden group rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              <div className="relative w-full h-[300px]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full  rounded-xl"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>
              <CardContent className="absolute bottom-0 left-0 w-full p-6 text-white">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <div className="flex items-center mt-2 text-sm text-gray-300">
                  <Eye size={18} className="mr-1" />
                  {post.views}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center pt-10">
          <Button className="px-6 py-2 text-lg bg-teal-600 hover:bg-teal-700 text-white rounded-md shadow-md transition-all">
            VIEW ALL
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CustomerBlogs;
