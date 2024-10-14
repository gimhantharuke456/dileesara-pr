// services/appointmentService.js
const Appointment = require("../models/Appointment");

exports.createAppointment = async (appointmentData) => {
  return await Appointment.create(appointmentData);
};

exports.getAllAppointments = async () => {
  return await Appointment.find();
};

exports.getAppointmentById = async (id) => {
  return await Appointment.findById(id);
};

exports.updateAppointment = async (id, appointmentData) => {
  return await Appointment.findByIdAndUpdate(id, appointmentData, {
    new: true,
  });
};

exports.deleteAppointment = async (id) => {
  return await Appointment.findByIdAndDelete(id);
};
