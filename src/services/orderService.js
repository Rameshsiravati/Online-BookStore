import api from './api';

export const orderService = {
  async createOrder(orderData) {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  async getMyOrders() {
    const response = await api.get('/orders/my-orders');
    return response.data;
  },

  async getAllOrders() {
    const response = await api.get('/orders/all');
    return response.data;
  }
};