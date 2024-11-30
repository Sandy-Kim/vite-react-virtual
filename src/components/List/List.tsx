import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react"
import './List.css'
import initialList from './list.json'

type Post = {
  id: number;
  title: string;
}

export const List = () => {
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
    <ul className="list">
      {posts.map((post) => (
        <Link key={post.id} to={`/posts/${post.id}`}>
          <li>{post.title}</li>
        </Link>
      ))}
    </ul>
  )
}
