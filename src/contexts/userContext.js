import {createContext} from 'react'

const UserContext = createContext({
    currentUser : null,
    setCurrentUser : (user) => this.currentUser = user
})

export default UserContext