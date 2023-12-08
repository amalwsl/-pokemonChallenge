import React from "react"

import { render } from "react-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import "core-js/stable"
import "regenerator-runtime/runtime"
import "./index.css"
import Home from "./screens/Home"
import { ApolloProvider } from "@apollo/client"
import client from "./apollo"

const NotFound = (): React.ReactElement => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <img src="/images/notFound404.png" alt="not found 404" className=" w-1/2 " />
        </div>
    )
}

const AppRoutes = (): React.ReactElement => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    )
}

const App = (): React.ReactElement => {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </ApolloProvider>
    )
}

render(<App />, document.getElementById("root"))
