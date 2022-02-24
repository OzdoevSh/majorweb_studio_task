import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/CloseSharp';
import checkmark from '../../assets/icons/checkmark.svg'
import Modal from 'react-modal';


const SuccessModal = (props) => {
  const {
    openModal,
    handleCloseModal,
    user
  } = props

  const customStyles = {
    content: {
      top: '22%',
      left: '50%',
      width: '530px',
      height: '300px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      border: '5px solid rgb(1, 150, 135)',
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
    },
  };


  return (
    <Modal isOpen={openModal} style={customStyles}>
      <div>
        <IconButton
          style={{
            marginTop: "-25px",
            marginLeft: "480px"
          }}
          onClick={handleCloseModal}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div style={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
        <span style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "10px"}}>

          {user.firstName && user.lastName 
            ? <span>{user.firstName} {user.lastName}, </span>
            : <span>{user.nickname}, </span>
          }

          Вы успешно прошли регистрацию!
        </span>
        <img src={checkmark} style={{width: "140px"}}/>
      </div>
      
    </Modal>
  )
}

export default SuccessModal;