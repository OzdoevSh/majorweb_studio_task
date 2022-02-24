import './AccountPage.css'
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { toJS } from "mobx";
import user from "../../store/user";
import SuccessModal from "../SuccessModal";
import PersonCard from '../PersonCard';


const AccountPage = observer(() => {
  const [stateUser, setStateUser] = useState([])

  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }


  useEffect(async () => {
    await user.getUser()
    const newUser = toJS(user.array[0][0])
    setStateUser(newUser)
    handleOpenModal()
  }, [])



  return (
    <div>
        {stateUser.map((user) => {
          return (
            <div>
              <div className="header">
                <h1 style={{ textAlign: 'center', fontSize: '80px' }}>Личный кабинет</h1>
              </div>
              <PersonCard user={user}/>
              <SuccessModal
                openModal={openModal}
                user={user}
                handleCloseModal={handleCloseModal} 
              />
            </div>
          )
        })}
        <div className='majorweb'>majorweb.studio</div>
      </div>


  )
})

export default AccountPage;