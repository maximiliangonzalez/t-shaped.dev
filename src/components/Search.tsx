import React, {useRef, useState} from 'react'

const Search: React.FC = (): JSX.Element => {
  const searchTerm = useRef(null);
  const [searchResults, setSearchResults] = useState([]);

  const searchList = searchResults.map(result => {
    return (
      <li key={result._id} id={result._id}>
        {result.name}
      </li>
    );
  });

  const search = () => {
    const term = searchTerm.current.value;
    if (term.trim() !== '') {
      fetch(`/searchTopic/${term}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setSearchResults(data);
        })
        .catch(err => console.log(err));
    } else {
      setSearchResults([]);
    }
  };

  const hideSearch = () => {

  };

  const showSearch = () => {

  };

  return (
    <div> 
      <input type="text" placeholder="search" ref={searchTerm} onChange={search} onBlur={hideSearch} onFocus={showSearch} />
      {searchResults.length > 0 && 
        <ul>
          {searchList}
        </ul>
      }
    </div>
  )
};

export default Search;
