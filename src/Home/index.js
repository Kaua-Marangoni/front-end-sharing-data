import React, { useState, useRef } from "react"
import InputMask from "react-input-mask"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

import ImageHeader from "../assets/header-image.png"
import api from "../services/api"
import {
  Container,
  Image,
  ContainerItens,
  H1,
  InputLabel,
  Input,
  Button,
  ButtonGoNumbers
} from "./styles"

const App = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  const inputName = useRef()
  const inputNumber = useRef()

  const addNewUser = async () => {
    const onlyNumbers = str => str.replace(/[^0-9]/g, "")

    if (
      inputName.current.value <= 0 ||
      onlyNumbers(inputNumber.current.value).length <= 10
    ) {
      toast.warning("Os campos são obrigatórios!")
    } else {
      const { data: newUser } = await toast.promise(
        api.post("numbers", {
          name: inputName.current.value,
          number: inputNumber.current.value
        }),
        {
          pending: "Enviando Dados",
          success: "Dados Cadastrados",
          error: "Falha no sistema, por favor tente novamente!"
        }
      )

      setUsers([...users, newUser])
      navigate("/users")
    }
  }

  const goPageUsers = () => {
    navigate("/users")
  }

  return (
    <Container>
      <Image src={ImageHeader} alt="Imagem Inicial" />

      <ContainerItens>
        <H1>Conecte-se</H1>

        <InputLabel>Nome</InputLabel>
        <Input ref={inputName} type="text" placeholder="Ex: João da Silva" />

        <InputLabel>Número</InputLabel>

        <InputMask
          mask="(99) 99999-9999"
          className="input"
          ref={inputNumber}
          placeholder="Ex: (xx) xxxxx-xxxx"
        />

        <Button onClick={addNewUser}>Adicionar</Button>

        <ButtonGoNumbers onClick={goPageUsers}>Ver Números</ButtonGoNumbers>
      </ContainerItens>
    </Container>
  )
}

export default App
