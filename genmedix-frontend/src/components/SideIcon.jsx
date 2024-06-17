import { useStoreActions, useStoreState } from "easy-peasy"
import { useNavigate } from "react-router-dom"

const SideIcon = ({icon, feature, link }) => {
    const isOpen = useStoreState(state => state.isOpen)
    const setIsOpen = useStoreActions(actions => actions.setIsOpen)
    const navigate = useNavigate()

    const handleNavigation = () => {
        navigate(link)
        setIsOpen(false)
    }

    return (
        <button onClick={handleNavigation} className="h-12 flex items-center hover:font-bold">
            <p className="mr-2">{icon}</p>
            <p className={` ${isOpen ? 'flex' : 'hidden'}`}>{feature}</p>
        </button>
    )
}

export default SideIcon