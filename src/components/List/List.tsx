import { Link } from "@tanstack/react-router";
import { useVirtualizer } from '@tanstack/react-virtual';
import { useState, useEffect, useRef } from "react"
import './List.css'
import initialList from './list.json'

type Post = {
  id: number;
  title: string;
}

export const List = () => {
  const parentRef = useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: 100,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  const [posts, setPosts] = useState<Post[]>([]);

  // useEffect(() => {
  //   console.log('effect');
  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //     .then((response) => response.json())
  //     .then((data) => setPosts(data))
  // }, []);

  useEffect(()=>{
    setPosts(initialList);
  },[])

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
