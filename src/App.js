import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import publicRoute from "./router/route";
import DefaultLayout from "./layout/defaultLayout";

function App() {
    return (
        <Router>
            <Routes>
                {publicRoute.map((router, index) => {
                    let Layout = DefaultLayout;
                    if (router.layout) {
                        Layout = router.layout;
                    }
                    const Pages = router.componet;
                    return <Route key={index} path={router.path} element={<Layout><Pages /></Layout>} />
                })}
            </Routes>
        </Router>
    );
}
export default App;