import { Avatar } from "@material-ui/core"
import { useRouter } from "next/dist/client/router"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import styled from "styled-components"
import { auth, db } from "../firebase"
import getRecipientEmail from "../utils/getRecipientEmail"

export default function Chat({ id, users }) {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(users, user)))

  const enterChat = () => {
    router.push(`/chat/${id}`)
  }

  const recipient = recipientSnapshot?.docs?.[0]?.data()
  const recipientEmail = getRecipientEmail(users, user)

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL}/>  
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>  
      )
      }
      <p>{recipientEmail}</p>
    </Container>
  )
}

const Container = styled.div`
  padding: 20px;

  display: flex;
  align-items: center;

  word-break: break-word;

  cursor: pointer;

  transition: all .12s linear;

  :hover {
    background-color: #e9eaeb;
  }
`

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`