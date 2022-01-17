import React, { useContext } from "react"
import PlanoContext from "../../contexts/PlanoContext";
import BeneficiosContext from "../../contexts/BeneficiosContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UsuarioContext from "../../contexts/UsuarioContext";

function TelaHome () {
    const { plano, setPlano } = useContext(PlanoContext);
    const {beneficios, setBeneficios} = useContext(BeneficiosContext);
    const { usuario, setUsuario } = useContext(UsuarioContext);

    console.log(beneficios);

    return(
        <Container>
            <StyledTopo><StyledImg src={plano.image}/></StyledTopo>
            <StyledCumprimento>Olá, {usuario.name}</StyledCumprimento>

            {beneficios.map(item =>
            <StyledAnchor  href={item.link} target="_blank"><p>{item.title}</p></StyledAnchor>
            )}

            <StyledLink to="/subscriptions"><p>Mudar plano</p></StyledLink>

        </Container>

    )
}

export default TelaHome;

const Container = styled.div`
	width: 100%;
	background: #0E0E13;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
`;

const StyledAnchor = styled.a`
    margin-top: 8px;
    margin-bottom: 24px;
    width: 299px;
    height: 52px;
    border-radius: 8px;
    background-color: #FF4791;
    font-family: Roboto;
    color: white;
    display: flex;
    justify-content: center;
    align-items:center;
`;
const StyledCumprimento = styled.div`
    margin-bottom: 53px;
    font-family: Roboto;
    font-weight: Bold;
    font-size: 24px;
    color: white;
`;
const StyledImg = styled.img`
    width: 74.52px;
    height: 50.87px;
`
const StyledTopo = styled.div`
    width: 299px;
    margin-bottom:12.13px;
`
const StyledLink = styled(Link)`
    margin-top: 8px;
    margin-bottom: 24px;
    width: 299px;
    height: 52px;
    border-radius: 8px;
    background-color: #FF4791;
    font-family: Roboto;
    color: white;
    display: flex;
    justify-content: center;
    align-items:center;
`;