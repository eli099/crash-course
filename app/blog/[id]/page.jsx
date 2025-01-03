import { notFound } from "next/navigation"

// catch an error if there is an issue with fetching the data
async function fetchPost(id) {

  try {
    // according to the JSONPlaceholder docs, an individual post has the route /posts/1 (GET)
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        next: {
          revalidate: 30,
        },
      }
    )

    const data = await response.json()
    return data
  } catch (error) {
    notFound()
  }

}

// to have the id value avilable within the page use 'params' prop
export default async function Page({ params }) {
  // store the id value
  const { id } = await params

  const data = await fetchPost(id)

  return (
    <main>
      <h1>Individual page: {id}</h1>
      <p>{data.title}</p>
      {/* Now if I type the url /posts/1, post/2, posts/3, 4, 5, 6 etc, the blog post with that id will show on that page */}
    </main>
  );
}

// provide array of elements that can be used as the slug within the blog route

// ! Example of of the json object for the posts

// ? [
// ?   {
// ?     "userId": 1,
// ?     "id": 1,
// ?     "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
// ?     "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
// ?   },
// ?   {
// ?     "userId": 1,
// ?     "id": 2,
// ?     "title": "qui est esse",
// ?     "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
// ?   },
// ?   {
// ?     "userId": 1,
// ?     "id": 3,
// ?     "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
// ?     "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
// ?   },
// ? ]

// Prepopulates post params to save time
// Creates data for all the posts that exist (in this case, 100)
export async function generateStaticParams() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/")
  const data = await response.json()

  return data.map((post) => ({
    // transform to string as it is needed for static paths

    // ! Error that shows otherwise:
    // ? ⨯ Failed to generate static paths for /blog/[id]:
    // ? Error: A required parameter (id) was not provided as a string received number in generateStaticParams for /blog/[id]

    id: String(post.id)
  }))
}

// Error catching for IDs that are out of current scope (for API)
export const dynamicParams = false