import axios from "axios";

class AppointmentService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:8080/api/appointments",
    });
  }

  // Create a new appointment
  async createAppointment(appointmentData) {
    try {
      const response = await this.api.post("/", appointmentData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Get all appointments
  async getAllAppointments() {
    try {
      const response = await this.api.get("/");
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Get a single appointment by ID
  async getAppointmentById(id) {
    try {
      const response = await this.api.get(`/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Update an appointment
  async updateAppointment(id, appointmentData) {
    try {
      const response = await this.api.put(`/${id}`, appointmentData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Delete an appointment
  async deleteAppointment(id) {
    try {
      const response = await this.api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Error handling method
  handleError(error) {
    console.error("API Error:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Data:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Message:", error.message);
    }
    throw error; // Re-throw the error so it can be caught and handled by the component
  }
}

export default new AppointmentService();
