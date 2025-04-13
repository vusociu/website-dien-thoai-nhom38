import Detail from "../pages/Detail/index.jsx";
import Broad from "../pages/Broads/_id";

const publicRoutes = [
    { path:'/', component: Broad },
    { path:'/detail', component: Detail },

]
const privateRoutes = [

]

export { publicRoutes, privateRoutes }