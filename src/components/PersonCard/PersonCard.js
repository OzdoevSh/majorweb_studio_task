import phone from '../../assets/icons/phone.svg'
import male from '../../assets/icons/male.svg'
import female from '../../assets/icons/female.svg'
import mail from '../../assets/icons/mail.svg'

function PersonCard(props) {
  const {
    user
  } = props

  return (
    <div className="person">

      <span style={{ fontSize: '55px', fontWeight: 'bold' }}>#{user.nickname}</span>
      <div className="information">

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '35px', fontWeight: 'bold' }}>{user.firstName} {user.lastName}</span>
          {user.gender ?
            user.gender === "female"
              ? <img style={{ width: "40px" }} src={female} />
              : <img style={{ width: "40px" }} src={male} />
            : null
          }
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={phone} style={{ width: '40px' }} />
          <span style={{ fontSize: '25px', fontWeight: 'bold', marginLeft: '10px' }}>+{user.phone}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={mail} style={{ width: '40px' }} />
          <span style={{ fontSize: '25px', fontWeight: 'bold', marginLeft: '10px' }}>{user.email}</span>
        </div>
      
      </div>

      {user.about 
        ? <div className="aboutItem">
            <h3 className="avoutTitle">Обо мне</h3>
            <p className="aboutContent">{user.about}</p>
          </div>
        : <div></div>
      }
      
    </div>
  )
}

export default PersonCard