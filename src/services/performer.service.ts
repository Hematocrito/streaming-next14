import { APIRequest } from './api-request';

export class PerformerService extends APIRequest {
  search(query?: { [key: string]: any }) {
    return this.get(this.buildUrl('/performers/getAll', query));
  }

  topModels() {
    return this.get('/performers/top');
  }

  me(headers?: { [key: string]: string }) {
    return this.get('/performers/me', headers);
  }

  findOne(id: string, headers?: { [key: string]: string }) {
    return this.get(`/performers/${id}`, headers);
  }

  getAvatarUploadUrl() {
    const endpoint = process.env.API_ENDPOINT;
    return `${
      endpoint
    }/performers/avatar/upload`;
  }

  getCoverUploadUrl() {
    const endpoint = process.env.API_ENDPOINT;
    return `${
      endpoint
    }/performers/cover/upload`;
  }

  getVideoUploadUrl() {
    const endpoint = process.env.API_ENDPOINT;
    return `${
      endpoint
    }/performers/welcome-video/upload`;
  }

  updateStatus(id: string, payload: any) {
    return this.put(`/performers/status/${id}`, payload);
  }

  updateMe(id: string, payload: any) {
    return this.put(`/performers/${id}`, payload);
  }

  removeMe(id: string) {
    return this.del(`/performers/${id}`);
  }

  increaseView(id: string) {
    return this.post(`/performers/${id}/inc-view`);
  }

  checkSubscribe(id: string) {
    return this.post(`/performers/${id}/check-subscribe`);
  }

  updateBanking(id: string, payload: any) {
    return this.put(`/performers/${id}/banking-settings`, payload);
  }

  updatePaymentGateway(id:any, payload:any) {
    return this.put(`/performers/${id}/payment-gateway-settings`, payload);
  }

  getDocumentUploadUrl() {
    const endpoint = process.env.API_ENDPOINT;
    return `${
      endpoint
    }/performers/documents/upload`;
  }

  getCommissions() {
    return this.get('/performers/commissions');
  }
}

export const performerService = new PerformerService();
