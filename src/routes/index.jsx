import Detail from "../pages/Detail/index.jsx";
import Broad from "../pages/Broads/_id";
import Admin from "../pages/Admin/index.jsx";

const publicRoutes = [
    { path:'/', component: Broad },
    { path:'/detail/:id', component: Detail },
    { path:'/admin', component: Admin },

]
const privateRoutes = [

]

export { publicRoutes, privateRoutes }