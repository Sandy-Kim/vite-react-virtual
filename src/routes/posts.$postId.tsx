import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { postId } = useParams({ from: '/posts/$postId' })
  return <div>{`Hello "/posts/${postId}"!`}</div>
}
