import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar, User, Tag, Search } from "lucide-react";
import { Link } from "react-router-dom";

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "10 Warning Signs of an Online Shopping Scam",
    excerpt:
      "Learn to identify the red flags that could indicate an online store is fraudulent and how to protect yourself when shopping online.",
    author: "Emma Chen",
    date: "November 15, 2023",
    category: "Shopping Safety",
    tags: ["online shopping", "scam detection", "e-commerce"],
    imageUrl: "https://placehold.co/800x450?text=Shopping+Scam",
  },
  {
    id: 2,
    title: "The Rise of AI-Generated Phishing Emails",
    excerpt:
      "Artificial intelligence is making phishing emails more sophisticated and harder to detect. Here's how to spot them and protect yourself.",
    author: "Michael Rodriguez",
    date: "November 8, 2023",
    category: "Email Security",
    tags: ["phishing", "AI", "email security"],
    imageUrl: "https://placehold.co/800x450?text=AI+Phishing",
  },
  {
    id: 3,
    title: "Cryptocurrency Scams: New Trends in 2023",
    excerpt:
      "As cryptocurrency becomes more mainstream, scammers are finding new ways to target investors. Learn about the latest scams and protection strategies.",
    author: "Sarah Johnson",
    date: "October 27, 2023",
    category: "Cryptocurrency",
    tags: ["cryptocurrency", "bitcoin", "investment scams"],
    imageUrl: "https://placehold.co/800x450?text=Crypto+Scams",
  },
  {
    id: 4,
    title: "How to Secure Your Smart Home Devices",
    excerpt:
      "Smart home devices can pose security risks if not properly configured. Follow these steps to enhance the security of your connected home.",
    author: "David Kim",
    date: "October 15, 2023",
    category: "IoT Security",
    tags: ["smart home", "IoT", "privacy"],
    imageUrl: "https://placehold.co/800x450?text=Smart+Home",
  },
  {
    id: 5,
    title: "The Psychology Behind Scams: Why People Fall for Them",
    excerpt:
      "Understanding the psychological tactics scammers use can help you avoid becoming a victim. We explore the common manipulation techniques in this article.",
    author: "Emma Chen",
    date: "October 10, 2023",
    category: "Psychology",
    tags: ["psychology", "social engineering", "scam tactics"],
    imageUrl: "https://placehold.co/800x450?text=Scam+Psychology",
  },
  {
    id: 6,
    title: "Protecting Children Online: A Parent's Guide",
    excerpt:
      "Children face unique risks online. This comprehensive guide helps parents create a safer online environment for their kids.",
    author: "Sarah Johnson",
    date: "October 3, 2023",
    category: "Family Safety",
    tags: ["children", "parental controls", "online safety"],
    imageUrl: "https://placehold.co/800x450?text=Children+Safety",
  },
];

// Sample categories
const categories = [
  { name: "Shopping Safety", count: 12 },
  { name: "Email Security", count: 8 },
  { name: "Cryptocurrency", count: 6 },
  { name: "IoT Security", count: 5 },
  { name: "Psychology", count: 4 },
  { name: "Family Safety", count: 7 },
  { name: "Identity Theft", count: 9 },
  { name: "Mobile Security", count: 11 },
];

// Sample popular tags
const popularTags = [
  "phishing",
  "online shopping",
  "cryptocurrency",
  "identity theft",
  "social media",
  "password security",
  "data breach",
  "privacy",
  "scam detection",
  "mobile security",
];

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="ScamAdviser Blog"
          description="Stay informed about the latest scams, cybersecurity threats, and online safety tips"
        />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Post */}
              <div className="mb-10">
                <Card className="overflow-hidden">
                  <div className="relative">
                    <img
                      src="https://placehold.co/1200x600?text=Featured+Post"
                      alt="Featured post"
                      className="w-full h-64 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-red-600">
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline">Trending</Badge>
                      <Badge variant="secondary">Identity Theft</Badge>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      <Link
                        to="/blog/identity-theft-protection"
                        className="hover:text-red-600 transition-colors"
                      >
                        The Complete Guide to Protecting Your Identity Online in
                        2023
                      </Link>
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Identity theft affects millions of people every year. This
                      comprehensive guide covers everything you need to know to
                      protect your personal information from sophisticated
                      digital threats.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Michael Rodriguez
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        November 20, 2023
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button asChild variant="outline">
                      <Link to="/blog/identity-theft-protection">
                        Read Full Article
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Blog Posts */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <div>
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <CardContent className="pt-5">
                      <Badge variant="secondary" className="mb-2">
                        {post.category}
                      </Badge>
                      <h3 className="text-lg font-bold mb-2">
                        <Link
                          to={`/blog/${post.id}`}
                          className="hover:text-red-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-700 mb-4 text-sm">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {post.date}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Search */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Search Articles
                  </h3>
                  <div className="relative">
                    <Input placeholder="Search the blog..." className="pl-9" />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <Link
                          to={`/blog/category/${category.name.toLowerCase().replace(" ", "-")}`}
                          className="flex justify-between items-center py-1 hover:text-red-600"
                        >
                          <span>{category.name}</span>
                          <Badge variant="outline">{category.count}</Badge>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                      <Link
                        key={index}
                        to={`/blog/tag/${tag.replace(" ", "-")}`}
                      >
                        <Badge
                          variant="secondary"
                          className="hover:bg-red-100 cursor-pointer"
                        >
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-red-50 border-red-100">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Subscribe to Updates
                  </h3>
                  <p className="text-gray-700 mb-4 text-sm">
                    Get the latest articles and resources delivered straight to
                    your inbox.
                  </p>
                  <div className="space-y-2">
                    <Input placeholder="Your email address" type="email" />
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
