const getToken = async (req, res) => {
  const response = await fetch("https://api.orange.com/oauth/v3/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${process.env.ORANGE_SECRET}`,
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });
  const data = await response.json();

  return res.json(data);
};

const sendSms = async (req, res) => {
  const { token, message, number } = req.body;
  const payload = {
    outboundSMSMessageRequest: {
      address: `tel:+261${number}`,
      senderAddress: "tel:+261",
      senderName: "NOMERY",
      outboundSMSTextMessage: {
        message,
      },
    },
  };

  const response = await fetch(
    "https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B261/requests",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  return res.status(response.status).json(data);
};

module.exports = {
  getToken,
  sendSms,
};
