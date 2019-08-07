import React, {useRef} from 'react'

const Search = () => {
  const search = useRef(null);

  return (
    <> 
      <input type="text" ref={search}/>
    </>
  )
};

export default Search;
