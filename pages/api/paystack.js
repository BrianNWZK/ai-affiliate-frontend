import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const EXCHANGE_API = "https://api.exchangerate.host/latest";

const getExchangeRates = async (base = "USD") => {
  try {
    const response = await fetch(`${EXCHANGE_API}?base=${base}`);
    const data = await response.json();
    return data?.rates || {};
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return {};
  }
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { currency = "NGN" } = req.query;

    try {
      const headers = { Authorization: `Bearer ${PAYSTACK_SECRET}` };
      const totalByCurrency = {};
      let page = 1;
      const perPage = 50;

      while (true) {
        const response = await fetch(
          `https://api.paystack.co/transaction?page=${page}&perPage=${perPage}`,
          { headers }
        );
        const data = await response.json();

        if (response.status !== 200) {
          return res.status(500).json({ error: "Paystack API error" });
        }

        const transactions = data?.data || [];
        transactions.forEach((transaction) => {
          if (transaction.status === "success") {
            const txCurrency = transaction.currency.toUpperCase();
            const amount = transaction.amount / 100;
            totalByCurrency[txCurrency] = (totalByCurrency[txCurrency] || 0) + amount;
          }
        });

        if (!transactions.length || transactions.length < perPage) break;
        page++;
      }

      const rates = await getExchangeRates(currency.toUpperCase());
      const convertedTotals = Object.keys(totalByCurrency).reduce(
        (acc, key) => {
          const rate = rates[key] || 1;
          acc[key] = totalByCurrency[key] * rate;
          return acc;
        },
        {}
      );

      const totalRevenue = Object.values(convertedTotals).reduce((a, b) => a + b, 0);

      res.status(200).json({
        currency: currency.toUpperCase(),
        total: totalRevenue.toFixed(2),
        breakdown: totalByCurrency,
        ratesUsed: rates,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
