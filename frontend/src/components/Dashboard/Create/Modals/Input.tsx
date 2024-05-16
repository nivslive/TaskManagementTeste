const Input = (props: any) => {
    return <>
        <div>
            <label>{props.label}</label>
            <input contentEditable name={props.name} className="form-control" type="text" placeholder={props.placeholder}/>
            <hr />
        </div>
    </>;
};

export default Input;