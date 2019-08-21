import React, {useRef} from 'react'

const Search: React.FC = (): JSX.Element => {
  const searchTerm = useRef(null);

  const search = () => {
    const term = searchTerm.current.value;
    if (term !== '') {
      fetch(`/searchTopic/${term}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
        .catch(err => console.log(err));
    }
  };

  const hideSearch = () => {

  };

  const showSearch = () => {

  };

  return (
    <> 
      <input type="text" placeholder="search" ref={searchTerm} onChange={search} onBlur={hideSearch} onFocus={showSearch} />
    </>
  )
};

export default Search;
