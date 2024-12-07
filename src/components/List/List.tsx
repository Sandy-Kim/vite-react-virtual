import { Link, useElementScrollRestoration } from "@tanstack/react-router";
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from "react"
import { useQuery } from '@tanstack/react-query';
import './List.css'

type Post = {
  id: number;
  title: string;
}

export const List = () => {
  const { data: posts } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json()),
  });

  const scrollRestorationId = 'virtualizedContent';
  
  const scrollEntry = useElementScrollRestoration({
    id: scrollRestorationId,
  });

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: posts?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
    initialOffset: scrollEntry?.scrollY,
  });

  if(!posts) return null;

  return (
    <div className="box">
      <ul>
        {posts.map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <li>{post.title}</li>
          </Link>
        ))}
      </ul>
      <div 
        ref={parentRef}
        data-scroll-restoration-id={scrollRestorationId}
        className="list-box">
        <ul
          style={{
            position: 'relative',
            width: '100%',
            height: `${rowVirtualizer.getTotalSize()}px`
          }}>
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const post = posts[virtualItem.index];

            return (
            <Link key={post.id} to={`/posts/${post.id}`}>
              <li
                key={virtualItem.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                Row {virtualItem.index}
              </li>
            </Link>
            )})}
        </ul>
      </div>
    </div>
  )
}
