import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const ParentsDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            parentsFirstName: _entity?.parentsFirstName,
parentsLastName: _entity?.parentsLastName,
address: _entity?.address,
homePhone: _entity?.homePhone,
mobilePhone: _entity?.mobilePhone,
parentsEmailAdd: _entity?.parentsEmailAdd,
employment: _entity?.employment,
        };

        setLoading(true);
        try {
            
        const result = await client.service("parentsDetails").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info parentsDetails updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Edit ParentsDetails" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="parentsDetails-edit-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="parentsFirstName">ParentsFirstName:</label>
            <InputText id="parentsFirstName" className="w-full mb-3 p-inputtext-sm" value={_entity?.parentsFirstName} onChange={(e) => setValByKey("parentsFirstName", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="parentsLastName">ParentsLastName:</label>
            <InputText id="parentsLastName" className="w-full mb-3 p-inputtext-sm" value={_entity?.parentsLastName} onChange={(e) => setValByKey("parentsLastName", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="address">Address:</label>
            <InputText id="address" className="w-full mb-3 p-inputtext-sm" value={_entity?.address} onChange={(e) => setValByKey("address", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="homePhone">HomePhone:</label>
            <InputText id="homePhone" className="w-full mb-3 p-inputtext-sm" value={_entity?.homePhone} onChange={(e) => setValByKey("homePhone", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="mobilePhone">MobilePhone:</label>
            <InputText id="mobilePhone" className="w-full mb-3 p-inputtext-sm" value={_entity?.mobilePhone} onChange={(e) => setValByKey("mobilePhone", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="parentsEmailAdd">ParentsEmailAdd:</label>
            <InputText id="parentsEmailAdd" className="w-full mb-3 p-inputtext-sm" value={_entity?.parentsEmailAdd} onChange={(e) => setValByKey("parentsEmailAdd", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="employment">Employment:</label>
            <InputText id="employment" className="w-full mb-3 p-inputtext-sm" value={_entity?.employment} onChange={(e) => setValByKey("employment", e.target.value)}  required  />
        </span>
        </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ParentsDetailsCreateDialogComponent);
