# Rift Finance API Wrapper

A RESTful API wrapper for the [Rift Finance SDK](https://riftfi.xyz), providing easy HTTP access to blockchain wallet operations, DeFi services, and payment infrastructure.

## 🚀 What is Rift Finance?

Rift Finance is a comprehensive Web3 infrastructure platform that provides:
- **Wallet services** - Users can manage private keys on multiple chains
- **Cross-chain DeFi operations** - Support for multiple blockchains and tokens
- **Fiat on/off-ramps** - Convert between crypto and fiat currencies
- **Payment infrastructure** - Accept and send crypto payments easily
- **Merchant services** - Create invoices and manage business payments

## 📡 Base URL

```
https://api.riftfi.xyz/api/v1
```

## 🔑 Authentication

This API uses two types of authentication:

### 1. API Key Authentication
All requests require an API key in the header:
```bash
X-API-Key: your_project_api_key
```

### 2. Bearer Token Authentication  
User-specific operations require a bearer token:
```bash
Authorization: Bearer your_user_access_token
```

## 📚 API Documentation

Interactive Swagger documentation is available at:
```
https://api.riftfi.xyz/api-docs
```

## 🛠 Available Services

### 🔐 Authentication & User Management
- User signup/login with multiple methods (email, phone, external ID)
- OTP verification for secure authentication
- User profile management and updates
- Account recovery and password reset
- User deletion and logout
- User suspension / status lookup for the project owner (`/api/v1/users/*`)

### 💼 Merchant Services  
- Create and manage invoices
- Check merchant KYB approval status
- Business payment processing

### 💰 Wallet Operations
- Get token balances across multiple chains
- View all assets for specific blockchain networks
- Multi-chain wallet management

### 🔄 Transaction Services
- Send crypto transactions across supported chains
- View transaction history with filtering
- Calculate transaction fees
- Support for gasless transactions

### 📤 Off-ramp (Crypto → Fiat)
- Preview exchange rates for crypto-to-fiat conversion
- Get supported payment institutions by country/currency
- Create off-ramp orders 
- Send payment links via SMS/email
- Track withdrawal status and fees

### 📥 On-ramp (Fiat → Crypto)
- Initiate crypto purchases via buy requests
- Track on-ramp transaction status by transaction code
- View all on-ramp orders for a given user

### 🔔 Notification Services
- Register for push notifications
- Send test notifications
- Manage user subscriptions
- Broadcast messages to all subscribers

### ✍️ Signing & Proxy Wallet
- Get wallet instances for different chains
- Sign transactions and messages
- Send signed transactions to blockchain networks
- Blockchain interaction without exposing private keys

### 🪙 Asset Information
- Get supported blockchain networks
- View available tokens by chain
- Access token and chain metadata

### 🌉 Bridge
- Fetch available cross-chain bridge routes
- Get quotes for bridge transactions
- Execute cross-chain token transfers

### 🪪 KYC (Know Your Customer)
- Check user existence and verification status
- OTP-based identity verification flow
- Issue KYC tokens and track verification job status

### 🎁 Loyalty
- View user stats, point history, and leaderboard standings
- Redeem loyalty points and view redemption history
- Retrieve program metrics, config, and point value

### 📁 Project Management
- Full CRUD for projects (create, list, fetch, delete)
- Regenerate API keys and manage allowed origins
- Update payment widget config and view per-project stats

### 💸 Referral Fees
- Track referrer earned fee balances and fee entries
- Claim accumulated referral fees and view past claims
- Retrieve list of referred users with filtering

### 📊 Stats
- View platform-wide total transaction volume
- Retrieve total user count
- Access total value locked (TVL)

### 🔗 Wallet Connect
- Pair new WalletConnect sessions via URI
- List active sessions and disconnect by topic
- Approve or reject pending signing requests

### 🏊 Weekly Pool
- Retrieve the current active weekly reward pool
- View historical pool records
- Access referral-specific pool information

### 💳 Deposits
- Retrieve all deposits for the authenticated user

### 🔗 Payment Links
- Create, pay, list, and cancel payment requests
- Create and manage send links (specific and open)
- Register redirect URLs and retrieve all accessible users

## 🌐 Supported Blockchains

- **Ethereum** (ETH)
- **Polygon** (MATIC) 
- **Base** (Coinbase L2)
- **Arbitrum** (ARB)
- **Optimism** (OP)
- **BNB Smart Chain** (BNB)
- **Avalanche** (AVAX)
- **Lisk** (LSK)
- **Berachain** (BERA)

## 💎 Supported Tokens

- **USDC** - USD Coin
- **USDT** - Tether
- **ETH** - Ethereum
- **BTC** - Bitcoin (wrapped)
- **MATIC** - Polygon native token
- **BNB** - Binance native token
- And many more...

## 🚀 Quick Start Examples

### Get User Balance
```bash
curl -X GET "https://api.riftfi.xyz/api/v1/wallet/token-balance?token=USDC&chain=POLYGON" \
  -H "X-API-Key: your_api_key" \
  -H "Authorization: Bearer user_access_token"
```

### Send a Transaction
```bash
curl -X POST "https://api.riftfi.xyz/api/v1/transaction/send" \
  -H "X-API-Key: your_api_key" \
  -H "Authorization: Bearer user_access_token" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "0x742d35Cc6634C0532925a3b8D91a4d27c71e",
    "value": "1000000", 
    "token": "USDC",
    "chain": "POLYGON",
    "externalId": "user123",
    "password": "user_password"
  }'
```

### Create an Invoice
```bash
curl -X POST "https://api.riftfi.xyz/api/v1/merchant/invoices" \
  -H "X-API-Key: your_api_key" \
  -H "Authorization: Bearer user_access_token" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Product purchase",
    "amount": 100,
    "token": "USDC",
    "chain": "POLYGON"
  }'
```

### Preview Off-ramp Exchange Rate
```bash
curl -X POST "https://api.riftfi.xyz/api/v1/offramp/preview_exchange_rate" \
  -H "X-API-Key: your_api_key" \
  -H "Authorization: Bearer user_access_token" \
  -H "Content-Type: application/json" \
  -d '{
    "currency": "NGN"
  }'
```

### Sign up with email / phone (OTP)
Email and phone sign-ups prove ownership of the identifier with an OTP. One code covers signup and the first login:
```bash
# 1. Send a code to the email being registered
curl -X POST "https://api.riftfi.xyz/api/v1/auth/otp/send" \
  -H "X-API-Key: your_api_key" -H "Content-Type: application/json" \
  -d '{ "email": "alice@example.com" }'

# 2. Sign up with the code
curl -X POST "https://api.riftfi.xyz/api/v1/auth/signup" \
  -H "X-API-Key: your_api_key" -H "Content-Type: application/json" \
  -d '{ "email": "alice@example.com", "displayName": "Alice", "otpCode": "123456" }'

# 3. Log in with the SAME code (signup leaves a 10-minute one-time proof)
curl -X POST "https://api.riftfi.xyz/api/v1/auth/login" \
  -H "X-API-Key: your_api_key" -H "Content-Type: application/json" \
  -d '{ "email": "alice@example.com", "otpCode": "123456" }'
```
`otpCode` is required when the backend enforces `REQUIRE_SIGNUP_OTP`. When it does not, a supplied code is still verified, so always send it. Phone works the same way: `{ "phone": ... }` for `otp/send`, `phoneNumber` for signup and login. External ID + password sign-ups need no OTP.

### Change email / phone (OTP for the new value)
`PUT /api/v1/auth/user/update` needs an OTP sent to the NEW value. Changing one of them: send `otpCode`. Changing both: send `emailOtpCode` and `phoneOtpCode`. Other fields need no OTP.

### User management (project owner only)
`/api/v1/users/suspend`, `/unsuspend`, `/suspended`, `/status` and `/lookup` are authorised by the **project owner's** access token. Log in as the project owner and send it with the API key:
```bash
curl -X POST "https://api.riftfi.xyz/api/v1/users/suspend" \
  -H "X-API-Key: your_api_key" \
  -H "Authorization: Bearer project_owner_access_token" \
  -H "Content-Type: application/json" \
  -d '{ "email": "user@example.com", "reason": "Fraud" }'
```
`projectOwnerEmail` / `projectOwnerPhone` are deprecated and ignored (never forwarded). Calls without a bearer token get `401`.

## 🔧 Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Description of what went wrong"
}
```

### Common HTTP Status Codes:
- `200` - Success
- `201` - Created successfully 
- `400` - Bad request (invalid parameters)
- `401` - Unauthorized (missing/invalid auth)
- `429` - Rate limited, or OTP lockout after too many wrong codes. Wait before sending a new code
- `500` - Internal server error. Upstream 500s carry no internal detail; a `requestId` is appended to the message when available
- `503` - Upstream overloaded (e.g. `parent-proxy overloaded`). Back off

Notes:
- Every signing failure on a v1 (custodial) wallet now reads `invalid credentials`. Don't match on the older, more specific messages.
- The wrapper never retries internally (non-idempotent calls could be duplicated, then fail with `409`). Decide at the caller whether a retry is safe.

## 🏗 Architecture

This API wrapper is built with:
- **Express.js** - Fast web framework for Node.js
- **TypeScript** - Type-safe JavaScript
- **Rift SDK** - Core blockchain and payment functionality
- **Swagger/OpenAPI** - Comprehensive API documentation

## 🌍 Supported Regions

### Off-ramp Support:
- **Nigeria** (NGN) - Bank transfers, mobile money
- **Kenya** (KES) - M-Pesa, bank transfers

### On-ramp Support:
- **Kenya** - M-Pesa integration
- More regions coming soon...

## 📞 Support

For API support and integration help:
- 📧 Email: support@riftfi.xyz
- 📖 Documentation: [https://docs.riftfi.xyz](https://docs.riftfi.xyz)
- 🐛 Issues: [GitHub Issues](https://github.com/rift-finance/api-wrapper/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by the [Rift Finance](https://riftfi.xyz) team