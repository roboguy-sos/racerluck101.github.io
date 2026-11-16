import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import PostCard from "./PostCard";
import { getAllPosts } from "@/lib/blog";

export default function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="section">
      <div className="container-px">
        <SectionHeading
          eyebrow="Field Notes"
          title="Latest security writing"
          description="Research notes, lab walkthroughs, and the tradecraft behind the tooling."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/blog" className="btn-ghost">
            Read all posts
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
