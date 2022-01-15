import React,{ useContext, useEffect, useState } from "react"
import TokenContext from "../../contexts/TokenContext";
import axios from "axios";

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

		//requisicao.then(resposta => {
		//	setItems(resposta.data.items);
		//});
	}, []);
    
    //const promise = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", config);
    //promise.then(tratarSucesso);
    //promise.catch(tratarErro);



    //function tratarSucesso (sucesso){
    //    console.log(sucesso);
    //    setItems(sucesso.data.itens);
    //}

    //function tratarErro (falha){
    //    console.log(falha.response)
    //}

    return(
        <>
        <div>Página de Planos</div> <br/>
        <div>{token.token}</div>
        {items.map(item => <li>{item.price}</li>)}
        </>
    )
}


export default TelaPlanos;