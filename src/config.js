import dotenv from "dotenv";

dotenv.config({ quiet: true });

const PORT = process.env.PORT || 8080;
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA || "MONGODB";
const STRCNX = process.env.STRCNX || "mongodb://127.0.0.1:27017";
const BASE =
  process.env.NODE_ENV === "test"
    ? "vetapp_test"
    : process.env.BASE || "vetapp";
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM || "";
const TWILIO_WHATSAPP_TO = process.env.TWILIO_WHATSAPP_TO || "";

export default {
  PORT,
  MODO_PERSISTENCIA,
  STRCNX,
  BASE,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_FROM,
  TWILIO_WHATSAPP_TO,
};
