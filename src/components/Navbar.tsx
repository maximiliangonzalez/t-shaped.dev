import React, {useRef} from 'react'

export default () => {
  const name = useRef(null);
  const password = useRef(null);

  const signup = () => {
    if (name.current.value.length > 0 && password.current.value.length > 0) {
      fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.current.value,
          password: name.current.value
        })
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
    }
  }

  return (
    <>
      <input type="text" ref={name}></input>
      <input type="text" ref={password}></input>
      <button onClick={signup}>Sign Up</button>
    </>
  )
};