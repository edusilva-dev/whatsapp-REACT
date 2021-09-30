import moment from "moment"
import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components"
import { auth } from "../firebase"

export default function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth)

  const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <Timestamp>{message.timestamp ? moment(message.timestamp).format('LT') : '...' }</Timestamp>
      </TypeOfMessage>
    </Container>
  )
}

const Container = styled.div``

const MessageElement = styled.p`
  min-width: 60px;
  width: fit-content;

  padding: 15px;
  padding-bottom: 26px;
  margin: 10px;
  
  border-radius: 8px;

  text-align: right;

  position: relative;
`

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`

const Receiver = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`

const Timestamp = styled.span`
  padding: 10px;

  color: grey;
  font-size: 9px;
  text-align: right;
  
  position: absolute;
  bottom: 0;
  right: 0;
`