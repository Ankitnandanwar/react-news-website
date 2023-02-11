const reducer = (state,action) => {
    switch(action.type){
        case "SET_LOADING":
            return{
                ...state,
                isloading: true
            }

        case "GET_STORIES":
            return{
                ...state,
                isloading:false,
                hits: action.payload.hits,
                nbPages: action.payload.nbPages
            }
        case "REMOVE_POST":
            return{
                ...state,
                hits:state.hits.filter((curElem)=>{
                    return curElem.objectID !== action.payload
                })
            }
        case"SEARCH_QUERY":
            return{
                ...state,
                query:action.payload,
            }
        case "NEXT_PAGE":
            let NextPgNum = state.page + 1
            if(NextPgNum >= state.nbPages){
                NextPgNum = 0
            }
            return{
                ...state,
                page:NextPgNum
            }
        case "PREV_PAGE":
            let PageNum = state.page

            if(PageNum <= 0 ){
                PageNum = 0
            }else{
                PageNum = PageNum-1
            }
            return{
                ...state,
                page:PageNum
            }
    }
    return state
}

export default reducer