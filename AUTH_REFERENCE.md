# Auth — Signup, OTP, Login Reference

Base URL: `https://api.riftfi.xyz/api/v1`

This doc covers the full auth flow: **signup → send OTP → verify OTP → login → use bearer token**.

---

## Headers

There are two auth headers used across the API:

| Header          | Format                       | When                                                      |
| --------------- | ---------------------------- | --------------------------------------------------------- |
| `X-API-Key`     | `<your_project_api_key>`     | **Always required** — identifies your project             |
| `Authorization` | `Bearer <user_access_token>` | Required only for **user-level** endpoints (after login) |
| `Content-Type`  | `application/json`           | All POST/PUT/DELETE requests with a JSON body             |

### Which endpoints need what

| Endpoint               | `X-API-Key` | `Authorization: Bearer` |
| ---------------------- | :---------: | :---------------------: |
| `POST /auth/signup`    | yes         | no                      |
| `POST /auth/otp/send`  | yes         | no                      |
| `POST /auth/otp/verify`| yes         | no                      |
| `POST /auth/login`     | yes         | no                      |
| `GET  /auth/user/me`   | yes         | yes                     |
| `POST /auth/logout`    | yes         | yes                     |
| `PUT  /auth/user/update` | yes       | yes                     |
| `DELETE /auth/user/delete` | yes     | yes                     |

If `X-API-Key` is missing → `401 { "error": "Unauthorized: X-API-Key header is missing." }`
If `Authorization` is missing on a protected route → `401 { "error": "Unauthorized: Authorization header is missing." }`

---

## 1. Signup — `POST /auth/signup`

Creates a new user. There are **two valid body shapes**:

### a) With password (externalId-based account)

```json
{
  "externalId": "jane_doe",
  "password": "supersecret",
  "displayName": "Jane Doe",
  "phoneNumber": "+254700000000",
  "email": "jane@example.com",
  "paymentAccount": "0123456789"
}
```

| Field            | Type   | Required | Notes                                   |
| ---------------- | ------ | -------- | --------------------------------------- |
| `externalId`     | string | yes      | Unique username/identifier in your app  |
| `password`       | string | yes      |                                         |
| `displayName`    | string | yes      |                                         |
| `phoneNumber`    | string | optional | E.164 format (`+countrycodeNumber`)     |
| `email`          | string | optional |                                         |
| `paymentAccount` | string | optional | e.g. mobile money / bank account number |

### b) Passwordless (OTP-only account)

Omit `externalId` and `password`; supply `phoneNumber` and/or `email`:

```json
{
  "displayName": "Jane Doe",
  "phoneNumber": "+254700000000",
  "email": "jane@example.com"
}
```

### Response — `201 Created`

```json
{
  "message": "User created successfully",
  "userId": "usr_abc123..."
}
```

### cURL

```bash
curl -X POST https://api.riftfi.xyz/api/v1/auth/signup \
  -H "X-API-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "externalId": "jane_doe",
    "password": "supersecret",
    "displayName": "Jane Doe",
    "email": "jane@example.com"
  }'
```

---

## 2. Send OTP — `POST /auth/otp/send`

Sends a one-time code to the user's phone or email. Send **either** `phone` **or** `email`, not both.

### Body — by phone

```json
{
  "phone": "+254700000000"
}
```

### Body — by email

```json
{
  "email": "jane@example.com"
}
```

| Field   | Type   | Required                       |
| ------- | ------ | ------------------------------ |
| `phone` | string | required if `email` not given  |
| `email` | string | required if `phone` not given  |

### Response — `200 OK`

```json
{
  "status": "ok",
  "message": "OTP sent"
}
```

### cURL

```bash
curl -X POST https://api.riftfi.xyz/api/v1/auth/otp/send \
  -H "X-API-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "email": "jane@example.com" }'
```

---

## 3. Verify OTP — `POST /auth/otp/verify`

Verifies the code the user received. Use the same channel (`phone` **or** `email`) that you sent the OTP to.

### Body — by phone

```json
{
  "phone": "+254700000000",
  "code": "123456"
}
```

### Body — by email

```json
{
  "email": "jane@example.com",
  "code": "123456"
}
```

| Field   | Type   | Required                       |
| ------- | ------ | ------------------------------ |
| `code`  | string | yes                            |
| `phone` | string | required if `email` not given  |
| `email` | string | required if `phone` not given  |

### Response — `200 OK`

```json
{
  "status": "ok",
  "message": "OTP verified"
}
```

> Note: verifying OTP only marks the channel as verified. To get an access token you must call `/auth/login` (which itself can use the OTP code as the credential).

---

## 4. Login — `POST /auth/login`

There are **three valid body shapes**, depending on how the user authenticates.

### a) externalId + password

```json
{
  "externalId": "jane_doe",
  "password": "supersecret"
}
```

### b) phone + OTP

First call `/auth/otp/send` with `{ "phone": "..." }`, then:

```json
{
  "phoneNumber": "+254700000000",
  "otpCode": "123456"
}
```

### c) email + OTP

First call `/auth/otp/send` with `{ "email": "..." }`, then:

```json
{
  "email": "jane@example.com",
  "otpCode": "123456"
}
```

### Response — `200 OK` (`LoginResponse`)

```json
{
  "user": "usr_abc123...",
  "address": "0xEvmWalletAddress...",
  "btcAddress": "bc1qBitcoinAddress...",
  "accessToken": "eyJhbGciOi..."
}
```

| Field         | Type   | Notes                                                |
| ------------- | ------ | ---------------------------------------------------- |
| `user`        | string | User ID                                              |
| `address`     | string | EVM wallet address                                   |
| `btcAddress`  | string | Bitcoin address                                      |
| `accessToken` | string | **Use this as `Authorization: Bearer <accessToken>`** for all subsequent user-level requests |

### cURL examples

Login with externalId + password:

```bash
curl -X POST https://api.riftfi.xyz/api/v1/auth/login \
  -H "X-API-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "externalId": "jane_doe", "password": "supersecret" }'
```

Login with email + OTP:

```bash
curl -X POST https://api.riftfi.xyz/api/v1/auth/login \
  -H "X-API-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "email": "jane@example.com", "otpCode": "123456" }'
```

---

## 5. Get current user — `GET /auth/user/me`

Returns details for the logged-in user. Requires the bearer token.

### Headers

```
X-API-Key: <your_api_key>
Authorization: Bearer <accessToken from /auth/login>
```

### Response — `200 OK`

```json
{
  "user": {
    "id": "usr_abc123...",
    "externalId": "jane_doe",
    "displayName": "Jane Doe",
    "email": "jane@example.com",
    "phoneNumber": "+254700000000"
  }
}
```

### cURL

```bash
curl https://api.riftfi.xyz/api/v1/auth/user/me \
  -H "X-API-Key: $API_KEY" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

---

## 6. Logout — `POST /auth/logout`

Headers: `X-API-Key` + `Authorization: Bearer <token>`. No body.

### Response — `200 OK`

```json
{ "message": "Logged out successfully" }
```

---

## End-to-end flows

### Flow A — Passwordless email signup + login

```
1. POST /auth/signup            { displayName, email }
2. POST /auth/otp/send          { email }
3. POST /auth/login             { email, otpCode }      → accessToken
4. GET  /auth/user/me           Authorization: Bearer <accessToken>
```

### Flow B — Username + password signup + login

```
1. POST /auth/signup            { externalId, password, displayName }
2. POST /auth/login             { externalId, password }   → accessToken
3. GET  /auth/user/me           Authorization: Bearer <accessToken>
```

### Flow C — Phone OTP login (returning user)

```
1. POST /auth/otp/send          { phone }
2. POST /auth/login             { phoneNumber, otpCode }   → accessToken
```

---

## Common errors

| Status | Body                                                            | Cause                                       |
| ------ | --------------------------------------------------------------- | ------------------------------------------- |
| 401    | `{ "error": "Unauthorized: X-API-Key header is missing." }`     | Missing/blank `X-API-Key` header            |
| 401    | `{ "error": "Unauthorized: Authorization header is missing." }` | Protected route called without bearer token |
| 401    | `{ "error": "Unauthorized: Bearer token is missing." }`         | `Authorization` header lacks `Bearer <...>` |
| 400    | `{ "error": "<sanitized message>" }`                            | Validation / business-logic error           |
