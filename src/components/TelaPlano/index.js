import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import styled from "styled-components";
import TokenContext from "../../contexts/TokenContext";
import PlanoContext from "../../contexts/PlanoContext";
import BeneficiosContext from  "../../contexts/BeneficiosContext";

function TelaPlano () {
    const params = useParams();
    const token  = useContext(TokenContext);
    const { plano, setPlano } = useContext(PlanoContext);
    const { beneficios, setBeneficios } = useContext(BeneficiosContext);
    const [items, setItems] = useState([]);
    const navigate = useNavigate()


    const [cardName, setCardName] = useState ("");
    const [cardNumber, setCardNumber] = useState ("");
    const [securityNumber, setSecurityNumber] = useState ("");
    const [expirationDate, setExpirationDate] = useState ("");


    const config = {
        headers: {
            "Authorization": `Bearer ${token.token}`
        }
    }

    const formData = {
        membershipId: `${params.ID_DO_PLANO}`,
        cardName: cardName,
        cardNumber: cardNumber,
        securityNumber: securityNumber,
        expirationDate: expirationDate
    }

    useEffect(() => {
		const promise = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${params.ID_DO_PLANO}`, config);
        
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

            <StyledImg src={items.image} />
            <StyledTitle>{items.name}</StyledTitle> <br/>
            <PerksContainer>
                <TituloTopico>Benefícios:</TituloTopico>
                <ConteudoTopico>
                {/* Tô tentando o map aqui, mas não sai nem por reza brava */}
                {/*<ol>{items.perks.map(item =><li>{item.title} </li>)}
                    </ol>*/}
                </ConteudoTopico>
            </PerksContainer>
            <PriceContainer>
                <TituloTopico>Preco:</TituloTopico>
                <ConteudoTopico>R$ {items.price} cobrados mensalmente</ConteudoTopico>
            </PriceContainer>
            <form onSubmit={handleSubmit}>
                <StyledInput type="text" placeholder="Nome impresso no cartão" onChange={(event)=>setCardName(event.target.value)} /> <br/>
                <StyledInput placeholder="Digitos do cartão" onChange={(event)=>setCardNumber(event.target.value)} /> <br/>
                <StyledInput2 type="number" placeholder="Código de segurança" onChange={(event)=>setSecurityNumber(event.target.value)} /> <br/>
                <StyledInput2 placeholder="Validade" onChange={(event)=>setExpirationDate(event.target.value)} /> <br/>
                <StyledButton type="submit">ASSINAR</StyledButton>
            </form>
        </Container>
        )

        function handleSubmit (event){
            event.preventDefault();
    
            const promise = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions', formData, config);
    
            promise.then(tratarSucesso);
            promise.catch(tratarErro);
    
            function tratarSucesso (sucesso){
                //Faltando Modal
                console.log(sucesso);
                setPlano(sucesso.data.membership);
                setBeneficios(sucesso.data.membership.perks);
                navigate('/home');
            }
    
            function tratarErro (falha){
                console.log(falha.response)
                alert('Que pena! Algo deu errado.')
            }
    
        }
}

export default TelaPlano;

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
    margin-bottom: 22px;
`;

const StyledImg = styled.img`
    margin-bottom: 11.87px;
`
const PerksContainer = styled.div`
    margin-bottom: 12px;
`
const PriceContainer = styled.div`
    margin-bottom: 30px;
`
const StyledInput = styled.input`
    width: 299px;
    margin-top: 4px;
    margin-bottom: 4px;
    height: 52px;
    border-radius: 8px;
`
const StyledInput2 = styled.input`
    width: 145pxpx;
    margin-top: 4px;
    margin-bottom: 4px;
    height: 52px;
    border-radius: 8px;
`
const StyledButton = styled.button`
    margin-top: 8px;
    width: 299px;
    height: 52px;
    border-radius: 8px;
    background-color: #FF4791;
`
const TituloTopico = styled.div`
    font-family: Roboto;
    color: white;
    font-size: 16px;
`
const ConteudoTopico = styled.div`
    font-family: Roboto;
    color: white;
    font-size: 14px;
`