import axios from "axios";
import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import logo from "./logo.png"
import TokenContext from "../../contexts/TokenContext";
import PlanoContext from "../../contexts/PlanoContext";
import BeneficiosContext from "../../contexts/BeneficiosContext";
import UsuarioContext from "../../contexts/UsuarioContext";

function TelaLogin () {
    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");
    const navigate = useNavigate()
    const { token, setToken } = useContext(TokenContext);
    const { plano, setPlano } = useContext(PlanoContext);
    const { usuario, setUsuario } = useContext(UsuarioContext);
    const {beneficios, setBeneficios} = useContext(BeneficiosContext)

    const formData = {
        email: email,
        password: password
    }

    function handleLogin (event){
        event.preventDefault();

        const promise = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/login', formData);

        promise.then(tratarSucesso);
        promise.catch(tratarErro);

        function tratarSucesso (sucesso){
            console.log(sucesso);
            setToken(sucesso.data.token);

            if (sucesso.data.membership==null){
                navigate('/subscriptions')
            }
            else {
                setUsuario(sucesso.data)
                setPlano(sucesso.data.membership)
                setBeneficios(sucesso.data.membership.perks)
                navigate('/home')
            }
        }

        function tratarErro (falha){
            console.log(falha.response)
            alert(`Falha no login. ${falha.response.data.message}`)
        }

    }
    
    return(
        <Container>
            <StyledImg src={logo} />

            <form onSubmit={handleLogin}>
                <StyledInput type="email" placeholder="E-mail" onChange={(event)=>setEmail(event.target.value)} /> <br/>
                <StyledInput type="password" placeholder="Senha" onChange={(event)=>setPassword(event.target.value)} /> <br/>
                <StyledButton type="submit">ENTRAR</StyledButton>
            </form>
            <StyledLink to="/sign-up">Não possuí uma conta? Cadastre-se</StyledLink>
        </Container>

        
    )
}

export default TelaLogin;

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

const StyledImg = styled.img`
    margin-bottom: 100px;
`