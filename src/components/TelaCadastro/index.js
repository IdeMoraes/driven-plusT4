import axios from "axios";
import React, { useState } from "react"
import { Link } from "react-router-dom";
import styled from 'styled-components';

function TelaCadastro () {
    const [name, setName] = useState ("");
    const [cpf, setCpf] = useState ("");
    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");

    const formData = {
        email: email,
        name: name,
        cpf: cpf,
        password: password
    }

    function handleSignUp (event){
        event.preventDefault();

        const promise = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up', formData);

        promise.then(tratarSucesso);
        promise.catch(tratarErro);

        function tratarSucesso (sucesso){
            console.log(sucesso);
            //Trocar para rota Login
        }

        function tratarErro (falha){
            console.log(falha.response)
            alert('Que pena! Algo deu errado.')
        }

    }
    
    return(
        <Container>
            <form onSubmit={handleSignUp}>
                <StyledInput type="text" placeholder="Nome" onChange={(event)=>setName(event.target.value)} /> <br/>
                <StyledInput placeholder="CPF" onChange={(event)=>setCpf(event.target.value)} /> <br/>
                <StyledInput type="email" placeholder="E-mail" onChange={(event)=>setEmail(event.target.value)} /> <br/>
                <StyledInput type="password" placeholder="Senha" onChange={(event)=>setPassword(event.target.value)} /> <br/>
                <StyledButton type="submit">CADASTRAR</StyledButton>
            </form>
            <StyledLink to="/">Já possuí uma conta? Entre</StyledLink>
        </Container>

        
    )
}

export default TelaCadastro;

const Container = styled.div`
	width: 100%;
	background: #0E0E13;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
`;

const StyledInput = styled.input`
    margin-bottom: 16px;
    width: 299px;
    height: 52px;
    border-radius: 8px;
`;

const StyledButton = styled.button`
    margin-top: 8px;
    margin-bottom: 24px;
    width: 299px;
    height: 52px;
    border-radius: 8px;
    background-color: #FF4791;
`;

const StyledLink = styled(Link)`
    font-family: Roboto;
    color: white;
`;