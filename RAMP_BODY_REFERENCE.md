# On-ramp & Off-ramp — Request Body Reference

Base URL: `https://api.riftfi.xyz/api/v1`

All endpoints require:
- `X-API-Key: <your_api_key>`
- `Authorization: Bearer <user_access_token>`
- `Content-Type: application/json`

Supported values used below:
- `currency`: `"NGN"` | `"KES"`
- `chain`: `"polygon"` | `"base"`
- `token` / `asset`: `"USDC"`

---

## On-ramp (fiat → crypto)

### 1. Initiate buy — `POST /onramp`

Body (`BuyRequest`):

```json
{
  "shortcode": "string",
  "amount": 0,
  "chain": "polygon",
  "asset": "USDC",
  "mobile_network": "string",
  "country_code": "string"
}
```

| Field            | Type   | Required | Notes                                              |
| ---------------- | ------ | -------- | -------------------------------------------------- |
| `shortcode`      | string | yes      | Mobile money shortcode the user pays from          |
| `amount`         | number | yes      | Fiat amount to buy with                            |
| `chain`          | enum   | yes      | `polygon` \| `base`                                |
| `asset`          | enum   | yes      | `USDC`                                             |
| `mobile_network` | string | yes      | e.g. `MPESA`, `MTN`, `AIRTEL` (network identifier) |
| `country_code`   | string | yes      | ISO country code, e.g. `KE`, `NG`                  |

Response (`BuyResponse`):

```json
{
  "transaction_code": "e44419a6-88f3-4754-b7d4-e4f09aa82916",
  "status": "PENDING",
  "message": "Success, kindly accept prompt sent."
}
```

### 2. Poll on-ramp status — `POST /onramp/status`

Body:

```json
{
  "transactionCode": "string"
}
```

Response (`OnrampStatusResponse`):

```json
{
  "status": "PENDING",
  "transactionCode": "string",
  "receipt_number": "string | null"
}
```

### 3. List user's on-ramp orders — `GET /onramp/orders/{userId}`

No body. `userId` is the path parameter.

---

## Off-ramp (crypto → fiat)

### Recipient object (used by `pay` and `createOrder`)

The `recipient` field on the body MUST be a **JSON-stringified** `Recipient`:

```ts
interface Recipient {
  name: string;
  bankCode: string;
  accountNumber: string;
  email?: string;
  phoneNumber?: string;
}
```

Example of how to build it client-side:

```js
const recipient = JSON.stringify({
  name: "Jane Doe",
  bankCode: "044",
  accountNumber: "0123456789",
  email: "jane@example.com",
  phoneNumber: "+2348012345678"
});
```

### 1. Preview exchange rate — `POST /offramp/preview_exchange_rate`

Body:

```json
{
  "currency": "NGN"
}
```

Response: `{ "rate": number }`

### 2. Get supported institutions — `GET /offramp/payment_methods/{currency}`

No body. `currency` (`NGN` | `KES`) is a path param.

### 3. Get withdrawal fee — `POST /offramp/get-withdrawal-fee`

Body:

```json
{
  "amount": 0
}
```

Response: `{ "fee": number }`

### 4. Send payment link — `POST /offramp/send-payment-link`

Body (`SendPaymentLinkRequest`) — must provide phone, email, or both:

```json
{
  "paymentLink": "https://...",
  "message": "Pay me",
  "recipientPhone": "+2348012345678",
  "recipientEmail": "jane@example.com"
}
```

| Field            | Type   | Required                                |
| ---------------- | ------ | --------------------------------------- |
| `paymentLink`    | string | yes                                     |
| `message`        | string | yes                                     |
| `recipientPhone` | string | one of `recipientPhone`/`recipientEmail` is required |
| `recipientEmail` | string | one of `recipientPhone`/`recipientEmail` is required |

### 5. Initiate off-ramp pay — `POST /offramp/pay`

Body (`PayRequest`):

```json
{
  "token": "USDC",
  "amount": 0,
  "currency": "NGN",
  "chain": "polygon",
  "recipient": "{\"name\":\"Jane Doe\",\"bankCode\":\"044\",\"accountNumber\":\"0123456789\",\"email\":\"jane@example.com\",\"phoneNumber\":\"+2348012345678\"}"
}
```

| Field       | Type   | Required | Notes                                  |
| ----------- | ------ | -------- | -------------------------------------- |
| `token`     | enum   | yes      | `USDC`                                 |
| `amount`    | number | yes      | Crypto amount to off-ramp              |
| `currency`  | enum   | yes      | `NGN` \| `KES`                         |
| `chain`     | enum   | yes      | `polygon` \| `base`                    |
| `recipient` | string | yes      | **JSON-stringified** `Recipient` object |

### 6. Create off-ramp order — `POST /offramp`

Body (`CreateOfframpOrderRequest`) — identical shape to `PayRequest`:

```json
{
  "token": "USDC",
  "amount": 0,
  "currency": "NGN",
  "chain": "polygon",
  "recipient": "{\"name\":\"Jane Doe\",\"bankCode\":\"044\",\"accountNumber\":\"0123456789\"}"
}
```

Response: `{ "order": OfframpOrder }`

### 7. Poll off-ramp order status — `GET /offramp/poll_order_status`

No body. Query params:

```
?transactionCode=<code>&currency=NGN
```

### 8. Get all off-ramp orders — `GET /offramp/get_orders`

No body, no query params.

---

## Quick cURL examples

**On-ramp buy:**

```bash
curl -X POST https://api.riftfi.xyz/api/v1/onramp \
  -H "X-API-Key: $API_KEY" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "shortcode": "174379",
    "amount": 100,
    "chain": "base",
    "asset": "USDC",
    "mobile_network": "MPESA",
    "country_code": "KE"
  }'
```

**Off-ramp pay:**

```bash
curl -X POST https://api.riftfi.xyz/api/v1/offramp/pay \
  -H "X-API-Key: $API_KEY" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "USDC",
    "amount": 50,
    "currency": "KES",
    "chain": "base",
    "recipient": "{\"name\":\"Jane Doe\",\"bankCode\":\"MPESA\",\"accountNumber\":\"+254700000000\"}"
  }'
```
