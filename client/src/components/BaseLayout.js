import useLocalStorage from 'use-local-storage';
import { useLocation} from "react-router-dom";
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import Footer from './Footer';

function BaseLayout(props) {
  const location = useLocation();
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }
  return (
    <div data-theme={theme} className="background">
      <div >
      { location.pathname === '/' || location.pathname === '/register'  ?
        ""
         : 
         <button className='theme-toggle' onClick={switchTheme}>
          {theme === 'light' ? <BsFillMoonStarsFill className='highlight'/> : <BsFillSunFill className='highlight' />}
        </button>
         }
      </div>
      {props.children}
      <Footer />
    </div>
  )
}


export default BaseLayout