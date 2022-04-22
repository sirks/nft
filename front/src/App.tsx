import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Admin from "./Pages/Admin";
import Client from "./Pages/Client";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/admin' element={<Admin/>}/>
                <Route path='/' element={<Client/>}/>
                <Route path="*" element={<Client/>}/>
            </Routes>
        </BrowserRouter>
    );
}
export default App;
