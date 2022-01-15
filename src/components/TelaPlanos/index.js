import React,{ useContext, useEffect, useState } from "react"
import TokenContext from "../../contexts/TokenContext";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

function TelaPlanos () {
    const token  = useContext(TokenContext);
    const [items, setItems] = useState([]);

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
            <div>{token.token}</div>
            {items.map(item =>
            <StyledPlano >
                <img src={item.image} />
                <StyledPrice>R$ {item.price}</StyledPrice>
                <StyledLink to={`/subscriptions/${item.id}`}></StyledLink>
            </StyledPlano>
            )}
        </Container>
    )
}

function EscolherPlano (o){
    alert()
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

const StyledLink = styled(Link)`
position: absolute;
top: 0;
bottom: 0;      
left: 0;
right: 0;
z-index: 999;
`

const StyledImg = styled.img`
    margin-bottom: 100px;
`