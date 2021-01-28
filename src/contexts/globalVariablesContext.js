import {createContext} from 'react'

const GlobalVariableContext = createContext({

    fieldIconColor : 'rgb(158, 158, 158)',

    serverDomain : 'http://localhost:3001',
})

export default GlobalVariableContext