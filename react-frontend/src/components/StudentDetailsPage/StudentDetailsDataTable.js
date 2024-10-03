import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../services/uploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../utils/DownloadCSV";

const StudentDetailsDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading, user}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');

const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.firstName}</p>
const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.lastName}</p>
const p_numberTemplate2 = (rowData, { rowIndex }) => <p >{rowData.age}</p>
const p_calendarTemplate3 = (rowData, { rowIndex }) => <p >{rowData.dateOfBirth}</p>
const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.address}</p>
const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.emailAddress}</p>
const dropdownArrayTemplate6 = (rowData, { rowIndex }) => <p >{rowData.gender}</p>
const p_numberTemplate7 = (rowData, { rowIndex }) => <p >{rowData.mobileNumber}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.createdAt).fromNow()}</p>;
    const pUpdatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.updatedAt).fromNow()}</p>;
    const pCreatedBy = (rowData, { rowIndex }) => <p>{rowData.createdBy?.name}</p>;
    const pUpdatedBy = (rowData, { rowIndex }) => <p>{rowData.updatedBy?.name}</p>;
    const paginatorLeft = <Button type="button" icon="pi pi-upload" text onClick={() => setShowUpload(true)} disabled={!false}/>;
    const paginatorRight = DownloadCSV({ data : items, fileName : "studentDetails"});
    const exportCSV = () => {dt.current?.exportCSV();};

    return (
        <>
        <DataTable value={items} ref={dt} removableSort onRowClick={onRowClick} scrollable rowHover stripedRows paginator rows={10} rowsPerPageOptions={[10, 50, 250, 500]} size={"small"}  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} rowClassName="cursor-pointer" alwaysShowPaginator={!urlParams.singleUsersId} loading={loading}>
<Column field="firstName" header="FirstName" body={pTemplate0} filter={selectedFilterFields.includes("firstName")} hidden={selectedHideFields?.includes("firstName")}  sortable style={{ minWidth: "8rem" }} />
<Column field="lastName" header="LastName" body={pTemplate1} filter={selectedFilterFields.includes("lastName")} hidden={selectedHideFields?.includes("lastName")}  sortable style={{ minWidth: "8rem" }} />
<Column field="age" header="Age" body={p_numberTemplate2} filter={selectedFilterFields.includes("age")} hidden={selectedHideFields?.includes("age")}  sortable style={{ minWidth: "8rem" }} />
<Column field="dateOfBirth" header="DateOfBirth" body={p_calendarTemplate3} filter={selectedFilterFields.includes("dateOfBirth")} hidden={selectedHideFields?.includes("dateOfBirth")}  sortable style={{ minWidth: "8rem" }} />
<Column field="address" header="Address" body={pTemplate4} filter={selectedFilterFields.includes("address")} hidden={selectedHideFields?.includes("address")}  sortable style={{ minWidth: "8rem" }} />
<Column field="emailAddress" header="EmailAddress" body={pTemplate5} filter={selectedFilterFields.includes("emailAddress")} hidden={selectedHideFields?.includes("emailAddress")}  sortable style={{ minWidth: "8rem" }} />
<Column field="gender" header="Gender" body={dropdownArrayTemplate6} filter={selectedFilterFields.includes("gender")} hidden={selectedHideFields?.includes("gender")}  style={{ minWidth: "8rem" }} />
<Column field="mobileNumber" header="MobileNumber" body={p_numberTemplate7} filter={selectedFilterFields.includes("mobileNumber")} hidden={selectedHideFields?.includes("mobileNumber")}  sortable style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            
        </DataTable>
        <Dialog header="Upload StudentDetails Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="studentDetails"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search StudentDetails" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
    <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false)
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default StudentDetailsDataTable;