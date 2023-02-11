import { useGlobalContext } from './Context'

const Stories = () => {
  const {hits, isloading, RemovePost} = useGlobalContext()

  if(isloading){
    return(
      <>
        <h1>Loading...</h1>
      </>
    )
  }
    return (
    <div className='stories-div'>
        {
          hits.map((curPost)=>{
            const {title, author, num_comments, objectID, url} = curPost
            return (
              <div className='card' key={objectID}>
                <h2>{title}</h2>
                <p>
                  By <span>{author}</span> | <span>{num_comments}</span> comments
                </p>
                <div className='card-btn'>
                  <a href={url} target="_blank">Read More</a>
                  <a href="#" onClick={()=>RemovePost(objectID)}>Remove</a>
                </div>
              </div>
            )
          })
        }
    </div>
  )
}

export default Stories