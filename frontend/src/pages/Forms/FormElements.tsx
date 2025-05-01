import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import InputGroup from "../../components/form/form-elements/InputGroup";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import CheckboxComponents from "../../components/form/form-elements/CheckboxComponents";
import RadioButtons from "../../components/form/form-elements/RadioButtons";
import ToggleSwitch from "../../components/form/form-elements/ToggleSwitch";
import FileInputExample from "../../components/form/form-elements/FileInputExample";
import SelectInputs from "../../components/form/form-elements/SelectInputs";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import InputStates from "../../components/form/form-elements/InputStates";
import PageMeta from "../../components/common/PageMeta";
import Select from "../../components/form/Select";
import { useEffect, useState } from "react";
import { api } from "../../config/api";
import axios from "axios";

export default function FormElements() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  useEffect(()=>{
    const fetchStudents = async () => {
      try {
        const response = await axios.get(api+'userRoutes/users');
        if(response.status === 200) {
          setStudents(response.data.users);
        }

      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();


  },[])
  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Attandence" />
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <h1 className="text-2xl font-semibold leading-tight">Attendance Form</h1>
              <p className="mt-2 text-sm text-gray-600">Please fill out the form below to mark attendance.</p>
            </div>
<div className="col-span-1 md:col-span-2 py-2 lg:col-span-3">
<h1 className="text-2xl font-semibold leading-tight">Select Student</h1>
            <Select
             
              options={students.map((student) => ({
                value: student?._id,
                label: `${student?.name}`,
              }))}
              onChange={(selectedOption:any) => {
                setSelectedStudent(selectedOption);
                console.log(selectedOption);
              }}
            />
            </div>
</div>
</div>
</div>
</div>

     
  );
}
