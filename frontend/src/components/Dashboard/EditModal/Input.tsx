const Input = (props: any) => {
    return <>
        <div>
            <label>{props.label}</label>
            <input contentEditable name={props.name} className="form-control" type="text" defaultValue={props.value}/>
            <hr />
        </div>
    </>;
};

export default Input;