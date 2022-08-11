import React from 'react';
import AppNavBar from "../Components/Common/AppNavBar";
import {useParams} from "react-router";
import Index from '../Components/TextDetection/Index.jsx';
const TextDetectionPage = () => {
    const params=useParams();
    return (
        <div>
            <AppNavBar/>
            <Index/>
        </div>
    );
};

export default TextDetectionPage;