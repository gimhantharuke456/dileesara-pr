import React, { useEffect, useState } from "react";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AppointmentService from "../services/appointmentService";

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Appointments", 14, 22);

    // Create the table data
    const tableColumn = [
      "First Name",
      "Last Name",
      "Email",
      "Mobile",
      "Date",
      "Time",
    ];
    const tableRows = appointments.map((appointment) => [
      appointment.firstName,
      appointment.lastName,
      appointment.email,
      appointment.mobileNumber,
      formatDate(appointment.appointmentDate),
      formatTime(appointment.appointmentTime),
    ]);

    // Generate the table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: {
        fontSize: 10,
        cellPadding: 2,
        overflow: "linebreak",
        cellWidth: "wrap",
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 25 },
        2: { cellWidth: 40 },
        3: { cellWidth: 30 },
        4: { cellWidth: 30 },
        5: { cellWidth: 20 },
      },
    });

    // Save the PDF
    doc.save("appointments.pdf");
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await AppointmentService.getAllAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to fetch appointments.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const onEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedAppointment = await AppointmentService.updateAppointment(
        editingAppointment._id,
        editingAppointment
      );
      setAppointments(
        appointments.map((appt) =>
          appt.id === updatedAppointment.id ? updatedAppointment : appt
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating appointment:", error);
      setError("Failed to update the appointment.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setDeleteLoading(id);
      try {
        await AppointmentService.deleteAppointment(id);
        setAppointments(appointments.filter((appt) => appt.id !== id));
      } catch (error) {
        console.error("Error deleting appointment:", error);
        setError("Failed to delete the appointment.");
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM Do YYYY");
  };

  const formatTime = (timeString) => {
    return moment(timeString, "HH:mm").format("hh:mm A");
  };

  return (
    <div className="container mx-auto ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <button
          onClick={downloadPDF}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Download PDF
        </button>
      </div>
      {isLoading ? (
        <p className="text-center py-4">Loading appointments...</p>
      ) : error ? (
        <p className="text-center py-4 text-red-500">{error}</p>
      ) : (
        <>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">First Name</th>
                <th className="px-4 py-2 text-left">Last Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Mobile Number</th>
                <th className="px-4 py-2 text-left">Appointment Date</th>
                <th className="px-4 py-2 text-left">Appointment Time</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-t">
                    <td className="px-4 py-2">{appointment.firstName}</td>
                    <td className="px-4 py-2">{appointment.lastName}</td>
                    <td className="px-4 py-2">{appointment.email}</td>
                    <td className="px-4 py-2">{appointment.mobileNumber}</td>
                    <td className="px-4 py-2">
                      {formatDate(appointment.appointmentDate)}
                    </td>
                    <td className="px-4 py-2">
                      {formatTime(appointment.appointmentTime)}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex">
                        <button
                          onClick={() => onEditAppointment(appointment)}
                          className="bg-blue-500 text-white py-1 px-2 rounded mr-2 hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(appointment._id)}
                          className={`bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ${
                            deleteLoading === appointment.id
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={deleteLoading === appointment._id}
                        >
                          {deleteLoading === appointment._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4 text-gray-500 font-medium"
                  >
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {isEditModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Appointment</h2>
                <form onSubmit={handleEditSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="firstName" className="block mb-1">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={editingAppointment?.firstName || ""}
                        onChange={(e) =>
                          setEditingAppointment({
                            ...editingAppointment,
                            firstName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block mb-1">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={editingAppointment?.lastName || ""}
                        onChange={(e) =>
                          setEditingAppointment({
                            ...editingAppointment,
                            lastName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={editingAppointment?.email || ""}
                        onChange={(e) =>
                          setEditingAppointment({
                            ...editingAppointment,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label htmlFor="mobileNumber" className="block mb-1">
                        Mobile Number
                      </label>
                      <input
                        id="mobileNumber"
                        type="tel"
                        value={editingAppointment?.mobileNumber || ""}
                        onChange={(e) =>
                          setEditingAppointment({
                            ...editingAppointment,
                            mobileNumber: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label htmlFor="appointmentDate" className="block mb-1">
                        Appointment Date
                      </label>
                      <input
                        id="appointmentDate"
                        type="date"
                        value={editingAppointment?.appointmentDate || ""}
                        onChange={(e) =>
                          setEditingAppointment({
                            ...editingAppointment,
                            appointmentDate: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label htmlFor="appointmentTime" className="block mb-1">
                        Appointment Time
                      </label>
                      <input
                        id="appointmentTime"
                        type="time"
                        value={editingAppointment?.appointmentTime || ""}
                        onChange={(e) =>
                          setEditingAppointment({
                            ...editingAppointment,
                            appointmentTime: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AppointmentTable;
