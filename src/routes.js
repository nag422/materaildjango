import SignupPage from './Pages/SignupPage';
import Profile from './Pages/Profile/index'
import SettingsPage from './Pages/Settings/index'
import Login from './Pages/Auth/Login'
import Articles from './Pages/Data/Articles';
import Videos from './Pages/Data/Videos';
import Pricing from './Pages/Data/Pricing';
import Tools from './Pages/Data/Tools';
import Trends from './Pages/Data/Trends';

// import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/",
    title: "Home",
    icon: "ni ni-tv-2 text-primary",
    component: Profile,
    layout: "/admin",
    
  },
  {
    path: "/profile",
    title: "Profile",
    icon: "ni ni-tv-2 text-primary",
    component: Profile,
    layout: "/admin",
    
  },
  {
    path: "/settings",
    title: "Settings",
    icon: "ni ni-tv-2 text-primary",
    component: SettingsPage,
    layout: "/admin"
    
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-tv-2 text-primary",
    component: Login,
    layout: "/admin"
    
  },
  {
    path: "/signup",
    name: "Signup",
    icon: "ni ni-tv-2 text-primary",
    component: SignupPage,
    layout: "/admin"
    
  },
  {
    path: "/articles",
    name: "Articles",
    icon: "ni ni-tv-2 text-primary",
    component: Articles,
    layout: "/admin"
    
  },
  {
    path: "/videos",
    name: "Videos",
    icon: "ni ni-tv-2 text-primary",
    component: Videos,
    layout: "/admin"
    
  },
  {
    path: "/tools",
    name: "Tools",
    icon: "ni ni-tv-2 text-primary",
    component: Tools,
    layout: "/admin"
    
  },
  {
    path: "/trends",
    name: "Trends",
    icon: "ni ni-tv-2 text-primary",
    component: Trends,
    layout: "/admin"
    
  }
  
 
];
export default routes;
