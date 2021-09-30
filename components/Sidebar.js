import styled from "styled-components"
import { Avatar, Button, IconButton } from "@material-ui/core"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import SearchIcon from "@material-ui/icons/Search"
import * as EmailValidator from 'email-validator'

import { auth, db } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import Chat from "./Chat"

export default function Sidebar() {
  const [user] = useAuthState(auth)
  const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
  const [chatsSnapshot] = useCollection(userChatRef)

  const createChat = () => {
    const email = prompt('Please enter the email from user that you want to chat with.')

    if (!email) return null;

    if (EmailValidator.validate(email) && !chatAlreadyExists(email) && email !== user.email) {
      db.collection('chats').add({
        users: [user.email, email]
      })
    }
  }

  const chatAlreadyExists = (recipientEmail) => {
    !!chatsSnapshot?.docs.find(chat => chat.data().users.find(user => user === recipientEmail)?.length > 0)
  }

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />

        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />

        <SearchInput placeholder="Search in chat" />
      </Search>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {chatsSnapshot?.docs.map(chat => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  min-width: 300px;
  max-width: 350px;
  height: 100vh;

  flex: 0.45;

  border-right: 1px solid whitesmoke;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`

const Search = styled.div`
  display: flex;
  align-items: center;

  padding: 20px;

  border-radius: 2px;
`

const SearchInput = styled.input`
  outline: none;
  border: none;

  flex: 1;
`

const Header = styled.div`
  height: 80px;

  padding: 15px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: sticky;
  left: 0;

  background-color: white;

  border-bottom: 1px solid whitesmoke;

  z-index: 1;
`

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  transition: .12s ease;

  :hover {
    opacity: 0.8;
  }
`

const IconsContainer = styled.div``