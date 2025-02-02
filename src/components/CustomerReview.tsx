import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import imge1 from "../assets/images/banner-1.jpg";
import imge2 from "../assets/images/banner-2.jpg";
import imge3 from "../assets/images/banner-3.jpg";
import imge4 from "../assets/images/banner-4.jpg";

const blogPosts = [
  {
    title: "Excepteur aliquip turducken",
    views: 81,
    image: imge1,
  },
  {
    title: "Meatloaf salami veni should",
    views: 120,
    image: imge2,
  },
  {
    title: "Pork chop dolor veniam filet mignon",
    views: 49,
    image: imge3,
  },
  {
    title: "Deserunt ex meatball ipsum",
    views: 76,
    image: imge4,
  },
  {
    title: "Voluptate chicken fatback pork ball",
    views: 67,
    image: imge1,
  },
];

const CustomerReview = () => {
  return (
    <div>
      <section className="py-16 bg-gray-100 font-primaryFront">
        <div className="container mx-auto text-center mb-8">
          <h2 className="text-2xl font-bold">LATEST BLOG POSTS</h2>
          <div className="w-16 h-1 bg-black mx-auto mt-2"></div>
        </div>
        <div className="grid gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card key={index} className="relative overflow-hidden group">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <CardContent className="absolute inset-0 flex flex-col justify-end bg-black/50 text-white p-4">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <div className="flex items-center mt-2 text-sm">
                  <Eye size={16} className="mr-1" />
                  {post.views}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
            VIEW ALL
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CustomerReview;
