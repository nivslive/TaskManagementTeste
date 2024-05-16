import { useDispatch, useSelector } from "react-redux";
import DashboardComponents from "../components/Dashboard/index";
import { dashboardActions } from "../store/dashboard-slice";
import { useEffect, useState } from "react";
import ErrorPage from "./Error";

const Dashboard = () => {
    const selector = useSelector((state: any) => state);
    const dispatch = useDispatch();
    function boot() {
        dispatch(dashboardActions.changeList({listName:'tarefas'}));
    }
    
    const [unmountBoot, setUnmountBoot] = useState(false);
    useEffect(() => {
        !(unmountBoot) && boot();
        setUnmountBoot(true);
    }, []);

    if(selector.error.showErrorHandlerForDBReason) {
        return (<>
            <ErrorPage typeError="db"/>
        </>);
    }

    return (<> 
        <div className={`d-flex p-3 flex-md-row flex-column justify-content-sm-center m-sm-auto`}>
                <DashboardComponents.Buttons/>
                <DashboardComponents.Search/>

                <DashboardComponents.Create.Button />
        
        </div>
        {selector.dashboard.iCanSeeCreateModal && <DashboardComponents.Create.Modal /> }
        {selector.dashboard.iCanSeeEditModal && <DashboardComponents.EditModal />}
        <DashboardComponents.List/>
    </>)
};
export default Dashboard;