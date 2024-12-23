// to have the id value avilable within the page use 'params' prop
export default async function Page({ params }) {
  // store the id value
  const { id } = params
  // according to the JSONPlaceholder docs, an individual post has the route (GET)	/posts/1
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      next: {
        revalidate: 30,
      },
    }
  )

  const data = await response.json()

  return (
    <main>
      <h1>Individual page: {id}</h1>
      <p>{data.title}</p>
      {/* Now if I type the url /posts/1, post/2, posts/3, 4, 5, 6 etc, the blog post with that id will show on that page */}
    </main>
  );
}