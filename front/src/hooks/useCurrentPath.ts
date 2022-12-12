import { matchRoutes, useLocation } from "react-router-dom"

const routes = [{ path: "/list/:id" }]

const useCurrentPath = () => {
    const location = useLocation()
    // @ts-ignore
    const [{ route }] = matchRoutes(routes, location)

    return route.path
}

export default useCurrentPath;
