import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";


const SingleParentsDetailsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("parentsDetails")
            .get(urlParams.singleParentsDetailsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "ParentsDetails", type: "error", message: error.message || "Failed get parentsDetails" });
            });
    }, [props,urlParams.singleParentsDetailsId]);


    const goBack = () => {
        navigate("/parentsDetails");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">ParentsDetails</h3>
                </div>
                <p>parentsDetails/{urlParams.singleParentsDetailsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">ParentsFirstName</label><p className="m-0 ml-3" >{_entity?.parentsFirstName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">ParentsLastName</label><p className="m-0 ml-3" >{_entity?.parentsLastName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Address</label><p className="m-0 ml-3" >{_entity?.address}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">HomePhone</label><p className="m-0 ml-3" >{_entity?.homePhone}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">MobilePhone</label><p className="m-0 ml-3" >{_entity?.mobilePhone}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">ParentsEmailAdd</label><p className="m-0 ml-3" >{_entity?.parentsEmailAdd}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Employment</label><p className="m-0 ml-3" >{_entity?.employment}</p></div>
            

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleParentsDetailsPage);
