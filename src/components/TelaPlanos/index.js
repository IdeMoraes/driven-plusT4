import React,{ useContext, useEffect, useState } from "react"
import TokenContext from "../../contexts/TokenContext";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


function TelaPlanos () {
    const token  = useContext(TokenContext);
    const [items, setItems] = useState([]);
    const navigate = useNavigate()

    const config = {
        headers: {
            "Authorization": `Bearer ${token.token}`
        }
    }

    useEffect(() => {
		const promise = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", config);
        
        promise.then(tratarSucesso);

        promise.catch(tratarErro);

        function tratarSucesso (sucesso){
            console.log(sucesso);
            setItems(sucesso.data);
        }
    
        function tratarErro (falha){
            console.log(falha.response)
        }

	}, []);

    return(
        <Container>
            <StyledTitle>Escolha seu Plano</StyledTitle> <br/>

            {items.map(item =>
            <StyledPlano  onClick={()=>EscolherPlano(item.id)}>
                <img src={item.image} />
                <StyledPrice>R$ {item.price}</StyledPrice>
            </StyledPlano>
            )}
        </Container>
    )

    function EscolherPlano (idPlano){
        navigate(`/subscriptions/${idPlano}`)
    }
    
}

export default TelaPlanos;

const Container = styled.div`
	width: 100%;
	background: #0E0E13;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
`;

const StyledTitle = styled.div`
    font-family: Roboto;
    font-weight: bold;
    font-size: 32px;
    color: #FFFFFF;
    margin-bottom: 24px;
`;

const StyledPlano = styled.div`
    margin-bottom: 10px;
    width: 290px;
    height: 180px;
    border-radius: 12px;
    border: 3px solid #7E7E7E;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative; 
`;

const StyledPrice = styled.div`
    font-family: Roboto;
    font-weight: bold;
    font-size: 24px;
    color: #FFFFFF;
`;

const StyledImg = styled.img`
    margin-bottom: 100px;
`