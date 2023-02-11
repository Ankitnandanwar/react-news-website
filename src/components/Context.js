// create a context (context API)
// provider
// consumer replaced with useContext hooks
import React,{useContext, useReducer, useEffect} from "react"
import reducer from "./reducer"

const API = "https://hn.algolia.com/api/v1/search?"
const initialState = {
    isloading:true,
    query:"CSS",
    nbPages:0,
    page:0,
    hits:[]
}

const AppContext = React.createContext()

const AppProvider = ({children}) =>{

    const [state, dispatch] = useReducer(reducer, initialState)

    const fetchApiData = async (url) =>{

        dispatch({type: "SET_LOADING"})

        try {
            const res = await fetch(url)
            const jdata = await res.json()
            console.log(jdata)
            dispatch({type:"GET_STORIES", 
            payload:{
                hits:jdata.hits,
                nbPages: jdata.nbPages,
            }})
        } catch (error) {
            console.log(error)
        }
    }

    // to remove the post
    const RemovePost = (post_id) =>{
        dispatch({type:"REMOVE_POST", payload:post_id})
    }
    

    // to search for the specific post
    const searchPost = (searchQuery) =>{
        dispatch({type:"SEARCH_QUERY", payload: searchQuery})
    }


    // Pagination function
    const prevPage = () =>{
        dispatch({type:"PREV_PAGE"})
    }


    const nextPage = () =>{
        dispatch({type:"NEXT_PAGE"})
    }


    // to call API funct
    useEffect(() => {
        fetchApiData(`${API}query=${state.query}&page=${state.page}`)
    }, [state.query, state.page])

    return(
        <AppContext.Provider value={{...state, RemovePost, searchPost, prevPage, nextPage}}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () =>{
    return useContext(AppContext)
} 

export {AppContext, AppProvider, useGlobalContext}