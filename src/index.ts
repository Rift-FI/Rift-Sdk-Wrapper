import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import merchantRouter from "./routes/merchant";
import walletRouter from "./routes/wallet";
import offrampRouter from "./routes/offramp";
import onrampV2Router from "./routes/onramp_v2";
import transactionRouter from "./routes/transaction";
import notificationRouter from "./routes/notification";
import signerRouter from "./routes/signer";
import assetsRouter from "./routes/assets";
import paymentLinksRouter from "./routes/payment-links";
import depositsRouter from "./routes/deposits";
import kycRouter from "./routes/kyc";
import loyaltyRouter from "./routes/loyalty";
import weeklyPoolRouter from "./routes/weekly-pool";
import referralFeesRouter from "./routes/referral-fees";
import bridgeRouter from "./routes/bridge";
import walletConnectRouter from "./routes/wallet-connect";
import projectRouter from "./routes/project";
import userManagementRouter from "./routes/user-management";
import statsRouter from "./routes/stats";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../docs.json";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Rift SDK API Wrapper");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/merchant", merchantRouter);
app.use("/api/v1/wallet", walletRouter);
app.use("/api/v1/offramp", offrampRouter);
app.use("/api/v1/onramp", onrampV2Router);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/signer", signerRouter);
app.use("/api/v1/assets", assetsRouter);
app.use("/api/v1/payment-links", paymentLinksRouter);
app.use("/api/v1/deposits", depositsRouter);
app.use("/api/v1/kyc", kycRouter);
app.use("/api/v1/loyalty", loyaltyRouter);
app.use("/api/v1/weekly-pool", weeklyPoolRouter);
app.use("/api/v1/referral-fees", referralFeesRouter);
app.use("/api/v1/bridge", bridgeRouter);
app.use("/api/v1/walletconnect", walletConnectRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/users", userManagementRouter);
app.use("/api/v1/stats", statsRouter);

// Swagger UI Endpoint
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument as swaggerUi.JsonObject)
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
