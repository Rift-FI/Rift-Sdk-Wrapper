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
import depositsRouter from "./routes/deposits";
import kycRouter from "./routes/kyc";
import bridgeRouter from "./routes/bridge";
import walletConnectRouter from "./routes/wallet-connect";
import userManagementRouter from "./routes/user-management";
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
app.use("/api/v1/deposits", depositsRouter);
app.use("/api/v1/kyc", kycRouter);
app.use("/api/v1/bridge", bridgeRouter);
app.use("/api/v1/walletconnect", walletConnectRouter);
app.use("/api/v1/users", userManagementRouter);

// Swagger UI Endpoint
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument as swaggerUi.JsonObject)
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
