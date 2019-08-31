import React, {useRef, useState} from 'react';
import SearchResult from './SearchResult';

const Search: React.FC = (): JSX.Element => {
  const searchTerm = useRef(null);
  const [searchResults, setSearchResults] = useState([]);

  const searchList = searchResults.map(({_id, name}) => <SearchResult key={_id} id={_id} name={name} />);

  const search = () => {
    const term = searchTerm.current.value;
    if (term.trim() !== '') {
      fetch(`topic/${term}`)
        .then(res => res.json())
        .then(data => {
          setSearchResults(data);
        })
        .catch(err => console.log(err));
    } else {
      setSearchResults([]);
    }
  };

  return (
    <> 
      <input type="text" placeholder="search" ref={searchTerm} onChange={search} />
      {searchResults.length > 0 && 
        <div className="dropdown">
          <ul className="dropdown-content">
            {searchList}
          </ul>
        </div>
      }
    </>
  )
};

export default Search;
