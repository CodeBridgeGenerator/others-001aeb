import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";


const SingleStudentDetailsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("studentDetails")
            .get(urlParams.singleStudentDetailsId, { query: { $populate: [            {
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
                props.alert({ title: "StudentDetails", type: "error", message: error.message || "Failed get studentDetails" });
            });
    }, [props,urlParams.singleStudentDetailsId]);


    const goBack = () => {
        navigate("/studentDetails");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">StudentDetails</h3>
                </div>
                <p>studentDetails/{urlParams.singleStudentDetailsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">FirstName</label><p className="m-0 ml-3" >{_entity?.firstName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">LastName</label><p className="m-0 ml-3" >{_entity?.lastName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Age</label><p className="m-0 ml-3" >{Number(_entity?.age)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">DateOfBirth</label><p id="dateOfBirth" className="m-0 ml-3" >{_entity?.dateOfBirth}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Address</label><p className="m-0 ml-3" >{_entity?.address}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">EmailAddress</label><p className="m-0 ml-3" >{_entity?.emailAddress}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">MobileNumber</label><p className="m-0 ml-3" >{Number(_entity?.mobileNumber)}</p></div>
            

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

export default connect(mapState, mapDispatch)(SingleStudentDetailsPage);
