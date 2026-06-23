import { BaseService } from "../base-service";
import { RiftHttpClient } from "../http-client";
import {
  LoginRequest,
  SignupRequest,
  OtpRequest,
  OtpVerifyRequest,
  OtpResponse,
  UserResponse,
  DeleteUserRequest,
  ApiResponse,
  LoginResponse,
  SignupResponse,
  DeleteUserResponse,
  CreateRecoveryRequest,
  CreateRecoveryResponse,
  RecoveryOptionsResponse,
  RequestPasswordResetRequest,
  RequestPasswordResetResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UpdateRecoveryRequest,
  UpdateRecoveryResponse,
  AddRecoveryMethodRequest,
  AddRecoveryMethodResponse,
  RemoveRecoveryMethodRequest,
  RemoveRecoveryMethodResponse,
  UpdateRecoveryMethodRequest,
  UpdateRecoveryMethodResponse,
  GetMyRecoveryMethodsRequest,
  GetMyRecoveryMethodsResponse,
  DeleteAllRecoveryMethodsRequest,
  DeleteAllRecoveryMethodsResponse,
  UpdateUserResponse,
  User,
  UpdateUserRequest,
  RiftConfig,
  RequestConfig,
} from "../types";

export class AuthService extends BaseService {
  // Auth used to point at a separate authentication.riftfi.xyz microservice
  // that's no longer maintained. We now use the same backend client as
  // every other service — the main backend has all auth routes mounted
  // under /v1/auth/*. No more parallel auth client.
  constructor(httpClient: RiftHttpClient, _config: RiftConfig) {
    super(httpClient);
  }

  // Helper to convert snake_case to camelCase for auth requests
  private transformAuthRequest(data: any): any {
    const transformed: any = {};
    
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && value !== null) {
        // Convert snake_case keys to camelCase
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        transformed[camelKey] = value;
      }
    }
    
    return transformed;
  }

  async signup(request: SignupRequest): Promise<SignupResponse> {
    return this.publicRequest<SignupResponse>({
      method: "POST",
      url: "/v1/auth/sign-up",
      data: this.transformAuthRequest(request),
    });
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await this.publicRequest<LoginResponse>({
      method: "POST",
      url: "/v1/auth/sign-in",
      data: this.transformAuthRequest(request),
    });

    if (response.accessToken) {
      this.setBearerToken(response.accessToken);
    }

    return response;
  }

  async updateUser(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    return this.authenticatedRequest<UpdateUserResponse>({
      method: "PUT",
      url: "/v1/me",
      data: this.transformAuthRequest(request),
    });
  }


  async sendOtp(request: OtpRequest): Promise<OtpResponse> {
    return this.publicRequest<OtpResponse>({
      method: "POST",
      url: "/v1/one-time-codes",
      data: this.transformAuthRequest(request),
    });
  }

  async verifyOtp(request: OtpVerifyRequest): Promise<OtpResponse> {
    return this.publicRequest<OtpResponse>({
      method: "POST",
      url: "/v1/one-time-codes/verify",
      data: this.transformAuthRequest(request),
    });
  }

  async getUser(): Promise<UserResponse> {
    return this.authenticatedRequest<UserResponse>({
      method: "GET",
      url: "/v1/me",
    });
  }

  async deleteUser(
    request: DeleteUserRequest
  ): Promise<ApiResponse<DeleteUserResponse>> {
    const response = await this.authenticatedRequest<
      ApiResponse<DeleteUserResponse>
    >({
      method: "DELETE",
      url: "/v1/me",
      data: this.transformAuthRequest(request),
    });

    this.clearBearerToken();

    return response;
  }

  logout(): void {
    this.clearBearerToken();
  }

  isAuthenticated(): boolean {
    return !!this.getBearerToken();
  }

  // Recovery System Methods

  async createRecoveryMethods(
    request: CreateRecoveryRequest
  ): Promise<CreateRecoveryResponse> {
    return this.authenticatedRequest<CreateRecoveryResponse>({
      method: "POST",
      url: "/v1/recovery/methods",
      data: this.transformAuthRequest(request),
    });
  }

  async getRecoveryOptions(
    externalId: string
  ): Promise<RecoveryOptionsResponse> {
    return this.publicRequest<RecoveryOptionsResponse>({
      method: "GET",
      url: `/recovery/options/${externalId}`,
    });
  }

  async requestPasswordReset(
    request: RequestPasswordResetRequest
  ): Promise<RequestPasswordResetResponse> {
    return this.publicRequest<RequestPasswordResetResponse>({
      method: "POST",
      url: "/v1/recovery/password-reset",
      data: this.transformAuthRequest(request),
    });
  }

  async resetPassword(
    request: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> {
    return this.publicRequest<ResetPasswordResponse>({
      method: "POST",
      url: "/v1/recovery/password-reset/complete",
      data: this.transformAuthRequest(request),
    });
  }

  async updateRecoveryMethods(
    request: UpdateRecoveryRequest
  ): Promise<UpdateRecoveryResponse> {
    return this.authenticatedRequest<UpdateRecoveryResponse>({
      method: "PUT",
      url: "/v1/recovery/methods",
      data: this.transformAuthRequest(request),
    });
  }

  async addRecoveryMethod(
    request: AddRecoveryMethodRequest
  ): Promise<AddRecoveryMethodResponse> {
    return this.authenticatedRequest<AddRecoveryMethodResponse>({
      method: "POST",
      url: "/v1/recovery/methods/by-type",
      data: this.transformAuthRequest(request),
    });
  }

  async removeRecoveryMethod(
    request: RemoveRecoveryMethodRequest
  ): Promise<RemoveRecoveryMethodResponse> {
    return this.authenticatedRequest<RemoveRecoveryMethodResponse>({
      method: "DELETE",
      url: "/v1/recovery/methods/by-type",
      data: this.transformAuthRequest(request),
    });
  }

  async updateRecoveryMethod(
    request: UpdateRecoveryMethodRequest
  ): Promise<UpdateRecoveryMethodResponse> {
    return this.authenticatedRequest<UpdateRecoveryMethodResponse>({
      method: "PUT",
      url: "/v1/recovery/methods/by-type",
      data: this.transformAuthRequest(request),
    });
  }

  async getMyRecoveryMethods(
    request: GetMyRecoveryMethodsRequest
  ): Promise<GetMyRecoveryMethodsResponse> {
    return this.authenticatedRequest<GetMyRecoveryMethodsResponse>({
      method: "POST",
      url: "/v1/recovery/methods",
      data: this.transformAuthRequest(request),
    });
  }

  async deleteAllRecoveryMethods(
    request: DeleteAllRecoveryMethodsRequest
  ): Promise<DeleteAllRecoveryMethodsResponse> {
    return this.authenticatedRequest<DeleteAllRecoveryMethodsResponse>({
      method: "DELETE",
      url: "/v1/recovery/methods",
      data: this.transformAuthRequest(request),
    });
  }
}
