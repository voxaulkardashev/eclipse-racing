import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { ImageBox, Ph } from "@/components/Placeholder";
import { posts } from "@/lib/site";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <>
      <PageHero title="News">
        <Ph>[One line on what gets posted here.]</Ph>
      </PageHero>

      <div className="container">
        <ul className="rows rows--thumbs">
          {posts.map((p) => (
            <li key={p.title}>
              <span className="rows__key mono">
                <Ph>{p.date}</Ph>
              </span>
              <div>
                <h2 style={{ fontSize: "1.25rem" }}>
                  <Ph>{p.title}</Ph>
                </h2>
                <p className="muted" style={{ marginTop: 6 }}>
                  <Ph>{p.summary}</Ph>
                </p>
              </div>
              <ImageBox label="Image" ratio="3 / 2" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
