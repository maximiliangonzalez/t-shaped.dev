import React from 'react'

const SearchResult: React.FC<{id: string, name: string}> = ({id, name}): JSX.Element => {
  return (
    <>
      <li id={id}>
        {name}
      </li>
    </>
  )
};

export default SearchResult;
