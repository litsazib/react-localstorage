import React from 'react';
import ViewDetails from "../Components/ViewDetails/ViewDetails";
import AppNavBar from "../Components/Common/AppNavBar";
import {useParams} from "react-router";
const ViewPage = () => {
    const params=useParams();
    return (
        <div>
            <AppNavBar/>
            <ViewDetails id={params['id']}/>
        </div>
    );
};

export default ViewPage;