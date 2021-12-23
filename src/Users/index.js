import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

import ImageHeader from "../assets/header-image.png"
import UsersLoading from "../Components/OrderLoading"
import api from "../services/api"
import {
  Container,
  Image,
  P,
  ContainerItens,
  H1,
  NumberUsers,
  DivSearch,
  InputSearch,
  FieldSearch,
  Data,
  Label,
  I,
  Input,
  ButtonLogin,
  User,
  NameUser,
  Number,
  ButtonGoHome
} from "./styles"

Modal.setAppElement("#root")

const App = () => {
  const [users, setUsers] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [password, setPassword] = useState()
  const [skeletonLoading, setSkeletonLoading] = useState(false)
  const [search, setSearch] = useState("")

  const openModal = () => {
    const user = sessionStorage.getItem("sharing-data:password")
    if (user) {
      navigate("/private18")
    } else {
      setModalIsOpen(true)
    }
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const customStyles = {
    content: {
      width: "300px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  }

  const navigate = useNavigate()

  const goBackPage = () => navigate("/")

  const changeInput = event => {
    setPassword(event.target.value)
  }

  const goPageAdmin = async () => {
    if (password === " ") {
      toast.success("Sucesso!")

      await sessionStorage.setItem("sharing-data:password", "passwordCorrect")

      navigate("/private18")
    } else {
      toast.error("Senha Incorreta")
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      setSkeletonLoading(true)
      const { data: allUsers } = await api.get("numbers")

      setUsers(allUsers)
      setSkeletonLoading(false)
    }

    fetchUsers()
  }, [])

  const numberOfUsers = () => {
    const number = users.length

    if (!skeletonLoading) {
      switch (number) {
        case 0:
          return (
            <NumberUsers className="number-peoples-registered">
              Nenhuma Pessoa Cadastrada
            </NumberUsers>
          )

        case 1:
          return (
            <NumberUsers className="number-peoples-registered">
              1 Pessoa Cadastrada
            </NumberUsers>
          )

        default:
          return (
            <NumberUsers className="number-peoples-registered">
              {number} Pessoas Cadastradas
            </NumberUsers>
          )
      }
    } else {
      return (
        <NumberUsers className="number-peoples-registered">
          N° Pessoas Cadastradas
        </NumberUsers>
      )
    }
  }

  const lowerSearch = search.toLowerCase()
  const onlyNumbers = str => str.replace(/[^0-9]/g, "")

  const usersFiltered = users.filter(
    user =>
      user.name.toLowerCase().includes(lowerSearch) ||
      onlyNumbers(user.number).includes(lowerSearch)
  )

  return (
    <Container>
      <i onClick={goBackPage} className="fas fa-arrow-left"></i>
      <Image src={ImageHeader} alt="Imagem Inicial" />

      <P onClick={openModal}>Admin</P>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <Label>Senha</Label>
        <I onClick={closeModal} className="fas fa-times"></I>
        <Input
          type="password"
          onChange={changeInput}
          placeholder="Digite a senha"
        />
        <ButtonLogin onClick={goPageAdmin}>Entrar</ButtonLogin>
      </Modal>

      <ContainerItens>
        <H1>Pessoas</H1>

        {numberOfUsers()}

        {skeletonLoading && (
          <>
            <UsersLoading />
            <UsersLoading />
            <UsersLoading />
            <UsersLoading />
          </>
        )}

        {!skeletonLoading && (
          <>
            <DivSearch>
              <FieldSearch>
                <i className="fas fa-search"></i>
                <InputSearch
                  type="text"
                  placeholder="Busca"
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                />
              </FieldSearch>
            </DivSearch>
            <ul>
              {usersFiltered.map(user => (
                <User key={user.id}>
                  <Data>
                    <NameUser>{user.name}</NameUser>
                    <Number>{user.number}</Number>
                  </Data>
                </User>
              ))}
              <ButtonGoHome onClick={goBackPage}>Voltar</ButtonGoHome>
            </ul>
          </>
        )}
      </ContainerItens>
    </Container>
  )
}

export default App
