import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const EXCHANGE_API = "https://api.exchangerate.host/latest";
