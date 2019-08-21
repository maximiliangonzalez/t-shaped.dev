import React, {useRef, useState} from 'react';
import SearchResult from './SearchResult';

const Search: React.FC = (): JSX.Element => {
  const searchTerm = useRef(null);
  const [focused, setFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const searchList = searchResults.map(({_id, name}) => <SearchResult key={_id} id={_id} name={name}/>);

  const search = () => {
    const term = searchTerm.current.value;
    if (term.trim() !== '') {
      fetch(`/searchTopic/${term}`)
        .then(res => res.json())
        .then(data => {
          setSearchResults(data);
        })
        .catch(err => console.log(err));
    } else {
      setSearchResults([]);
    }
  };

  const onBlur = () => setFocused(false);

  const onFocus = () => setFocused(true);

  return (
    <> 
      <input type="text" placeholder="search" ref={searchTerm} onChange={search} onBlur={onBlur} onFocus={onFocus}/>
      {searchResults.length > 0 && focused && 
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
