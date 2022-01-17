import React, { useContext } from "react"
import PlanoContext from "../../contexts/PlanoContext";
import BeneficiosContext from "../../contexts/BeneficiosContext";
import { Link } from "react-router-dom";

function TelaHome () {
    const { plano, setPlano } = useContext(PlanoContext);
    const {beneficios, setBeneficios} = useContext(BeneficiosContext);

    console.log(beneficios);

    return(
        <>
            <div>Página Home</div>


            <img src={plano.image}/>

            {beneficios.map(item =>
            <a  href={item.link} target="_blank">{item.title}</a>
            )}


        </>

    )
}

export default TelaHome;