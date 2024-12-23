// Need to make the component async function because we are awaiting (below)
export default async function Page() {
  // Fetch the data from the placeholder API
  // Getting the data serverside
  // ? Musch simpler than regular React
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  const data = await response.json()
  console.log(data)

  return (
    <main>
      <h1>Blog</h1>
      {data.map((post) =>
        (<p>{post.title}</p>))}
    </main>
  );
}

// updates the request every 30 seconds
export const revalidate = 30