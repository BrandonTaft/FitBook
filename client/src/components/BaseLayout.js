// import React, { useState, useEffect } from 'react';

// function BaseLayout(props) {
//   const [theme, setTheme] = useState('light');
//   const toggleTheme = () => {
//     if (theme === 'light') {
//       setTheme('dark');
//     } else {
//       setTheme('light');
//     }
//   };
//   useEffect(() => {
//     document.body.className = theme;
//   }, [theme]);
//   return (
//     <div>
//       <div className={`App ${theme}`}>
//         <button className='theme-toggle' onClick={toggleTheme}>Toggle Theme</button>
//       </div>
//       {props.children}
//     </div>
//   )
// }


import useLocalStorage from 'use-local-storage'

function BaseLayout(props) {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }
  return (
    <div data-theme={theme} className="background">
      <div >
        <button className='theme-toggle' onClick={switchTheme}>Toggle Theme to {theme === 'light' ? 'Dark' : 'Light'}</button>
      </div>
      {props.children}
    </div>
  )
}


export default BaseLayout