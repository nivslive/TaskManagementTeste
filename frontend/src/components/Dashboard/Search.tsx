import { useState } from "react";
import { useDispatch } from "react-redux";
import { dashboardActions } from "../../store/dashboard-slice";

const InputSearch = () => {
    const [searchText, setSearchText] = useState<any>('');
    const dispatch = useDispatch();
    function search(e: any) {
        setSearchText(e.target.value);
        dispatch(dashboardActions.searchByWord({searchText}));
    }
    return <>
        <input className={`form-control my-2`}
                type="text"
                placeholder="Digite para filtrar"
                value={searchText}
                onChange={search}
                onKeyDown={search}
        />
    </>;
};

export default InputSearch;