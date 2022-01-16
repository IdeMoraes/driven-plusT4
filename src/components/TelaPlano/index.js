import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import TokenContext from "../../contexts/TokenContext";

function TelaPlano () {
    const params = useParams();
    const token  = useContext(TokenContext);
    const [items, setItems] = useState([]);




    const config = {
        headers: {
            "Authorization": `Bearer ${token.token}`
        }
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
            <img src={items.image} />
            <StyledTitle>{items.name}</StyledTitle> <br/>
            <div className="topico-beneficios">
                <div className="titulo-topico">
                Benefícios:
                </div>
                <div className="conteudo-topico">
{/* Tô tentando o map aqui, mas não sai nem por reza brava */}
                    <ol>{items.perks.map(item =><li>{item.title} </li>)}
                    </ol>
                </div>
            </div>
            <div className="topico-preco">
                <div className="titulo-topico">
                Preco:
                </div>
                <div className="conteudo-topico">
                R$ {items.price} cobrados mensalmente
                </div>
            </div>
        </Container>
        )
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