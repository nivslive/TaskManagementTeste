import React from 'react';
import Button from "./DispatchStateButton";
import { useSelector } from 'react-redux';


const Buttons = () => {

    const dataButtons = [
        {name: 'departamentos', url: '/departamentos'}, 
        {name: 'funcionarios', url: '/funcionarios'},         
        {name: 'tarefas', url: '/tarefas'},    
    ];

    return <div className="d-flex justify-content-center"> 
    {
        dataButtons.map((button, k) => <Button key={k} url={button.url} name={button.name}/>)
    }
    </div>;
};

export default Buttons;