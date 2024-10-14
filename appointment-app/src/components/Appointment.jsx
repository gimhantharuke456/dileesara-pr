import React, { useState } from "react";
import AppointmentService from "../services/appointmentService";
import AppointmentTable from "./AppointmentTable";

const Appointment = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    nic: "",
    dateOfBirth: "",
    gender: "",
    appointmentDate: "",
    appointmentTime: "",
    departmentName: "",
    doctorName: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the error for this field when the user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstName.trim())
      formErrors.firstName = "First name is required";
    if (!formData.lastName.trim())
      formErrors.lastName = "Last name is required";
    if (!formData.email.trim()) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = "Email is invalid";
    if (!formData.mobileNumber.trim())
      formErrors.mobileNumber = "Mobile number is required";
    if (!formData.nic.trim()) formErrors.nic = "NIC is required";
    if (!formData.dateOfBirth)
      formErrors.dateOfBirth = "Date of birth is required";
    if (!formData.gender) formErrors.gender = "Gender is required";
    if (!formData.appointmentDate)
      formErrors.appointmentDate = "Appointment date is required";
    if (!formData.appointmentTime)
      formErrors.appointmentTime = "Appointment time is required";
    if (!formData.departmentName)
      formErrors.departmentName = "Department name is required";
    if (!formData.doctorName.trim())
      formErrors.doctorName = "Doctor name is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await AppointmentService.createAppointment(formData);
        console.log("Appointment created:", response);
        // Reset form or show success message
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobileNumber: "",
          nic: "",
          dateOfBirth: "",
          gender: "",
          appointmentDate: "",
          appointmentTime: "",
          departmentName: "",
          doctorName: "",
          note: "",
        });
        alert("Appointment created successfully!");
      } catch (error) {
        console.error("Error creating appointment:", error);
        alert("Failed to create appointment. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div id="appointments" className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row items-center mb-12">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h1 className="text-4xl font-bold mb-4">
            We help people to get appointment in online
          </h1>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac
            libero in turpis tincidunt consequat. Sed et lorem erat.
          </p>
        </div>
        <div className="md:w-1/2 relative">
          <div className="bg-blue-100 rounded-full h-64 w-64 absolute top-0 right-0 -z-10"></div>
          <img src="/laptop.png" alt="Laptop" className="relative z-10" />
        </div>
      </div>

      <h2 className="text-3xl font-semibold mb-6 text-gray-700">Appointment</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            {key === "note" ? (
              <textarea
                name={key}
                placeholder={
                  key.charAt(0).toUpperCase() +
                  key
                    .slice(1)
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                }
                value={value}
                onChange={handleChange}
                className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[key] ? "border-red-500" : "border-gray-300"
                } ${key === "note" ? "col-span-2" : ""}`}
                rows="4"
              />
            ) : key === "gender" || key === "departmentName" ? (
              <select
                name={key}
                value={value}
                onChange={handleChange}
                className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[key] ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">
                  Select{" "}
                  {key.charAt(0).toUpperCase() +
                    key
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                </option>
                {key === "gender" ? (
                  <>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </>
                ) : (
                  // Add department options here
                  <>
                    <option value="cardiology">Cardiology</option>
                    <option value="neurology">Neurology</option>
                    <option value="orthopedics">Orthopedics</option>
                  </>
                )}
              </select>
            ) : (
              <input
                type={
                  key.includes("date")
                    ? "date"
                    : key.includes("time")
                    ? "time"
                    : key === "email"
                    ? "email"
                    : "text"
                }
                name={key}
                placeholder={
                  key.charAt(0).toUpperCase() +
                  key
                    .slice(1)
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                }
                value={value}
                onChange={handleChange}
                className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[key] ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
            {errors[key] && (
              <span className="text-red-500 text-sm mt-1">{errors[key]}</span>
            )}
          </div>
        ))}
        <div className="col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? "Creating Appointment..." : "Register"}
          </button>
        </div>
      </form>
      <AppointmentTable />
    </div>
  );
};

export default Appointment;
