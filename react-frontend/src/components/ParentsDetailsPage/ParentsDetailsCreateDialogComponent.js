import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const ParentsDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.parentsFirstName)) {
                error["parentsFirstName"] = `ParentsFirstName field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.parentsLastName)) {
                error["parentsLastName"] = `ParentsLastName field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.address)) {
                error["address"] = `Address field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.homePhone)) {
                error["homePhone"] = `HomePhone field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.mobilePhone)) {
                error["mobilePhone"] = `MobilePhone field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.parentsEmailAdd)) {
                error["parentsEmailAdd"] = `ParentsEmailAdd field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.employment)) {
                error["employment"] = `Employment field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            parentsFirstName: _entity?.parentsFirstName,parentsLastName: _entity?.parentsLastName,address: _entity?.address,homePhone: _entity?.homePhone,mobilePhone: _entity?.mobilePhone,parentsEmailAdd: _entity?.parentsEmailAdd,employment: _entity?.employment,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("parentsDetails").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info ParentsDetails created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in ParentsDetails" });
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
        <Dialog header="Create ParentsDetails" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="parentsDetails-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="parentsFirstName">ParentsFirstName:</label>
                <InputText id="parentsFirstName" className="w-full mb-3 p-inputtext-sm" value={_entity?.parentsFirstName} onChange={(e) => setValByKey("parentsFirstName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["parentsFirstName"]) ? (
              <p className="m-0" key="error-parentsFirstName">
                {error["parentsFirstName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="parentsLastName">ParentsLastName:</label>
                <InputText id="parentsLastName" className="w-full mb-3 p-inputtext-sm" value={_entity?.parentsLastName} onChange={(e) => setValByKey("parentsLastName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["parentsLastName"]) ? (
              <p className="m-0" key="error-parentsLastName">
                {error["parentsLastName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="address">Address:</label>
                <InputText id="address" className="w-full mb-3 p-inputtext-sm" value={_entity?.address} onChange={(e) => setValByKey("address", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["address"]) ? (
              <p className="m-0" key="error-address">
                {error["address"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="homePhone">HomePhone:</label>
                <InputText id="homePhone" className="w-full mb-3 p-inputtext-sm" value={_entity?.homePhone} onChange={(e) => setValByKey("homePhone", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["homePhone"]) ? (
              <p className="m-0" key="error-homePhone">
                {error["homePhone"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="mobilePhone">MobilePhone:</label>
                <InputText id="mobilePhone" className="w-full mb-3 p-inputtext-sm" value={_entity?.mobilePhone} onChange={(e) => setValByKey("mobilePhone", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["mobilePhone"]) ? (
              <p className="m-0" key="error-mobilePhone">
                {error["mobilePhone"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="parentsEmailAdd">ParentsEmailAdd:</label>
                <InputText id="parentsEmailAdd" className="w-full mb-3 p-inputtext-sm" value={_entity?.parentsEmailAdd} onChange={(e) => setValByKey("parentsEmailAdd", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["parentsEmailAdd"]) ? (
              <p className="m-0" key="error-parentsEmailAdd">
                {error["parentsEmailAdd"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="employment">Employment:</label>
                <InputText id="employment" className="w-full mb-3 p-inputtext-sm" value={_entity?.employment} onChange={(e) => setValByKey("employment", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["employment"]) ? (
              <p className="m-0" key="error-employment">
                {error["employment"]}
              </p>
            ) : null}
          </small>
            </div>
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
