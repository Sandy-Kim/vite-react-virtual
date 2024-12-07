import { Link } from "@tanstack/react-router";
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
  const parentRef = useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: 100,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  if(!posts) return null;

  return (
    <div className="list-box">
      <ul ref={parentRef} className="list" style={{
        width: '100%',
        position: 'relative',
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
  )
}
