const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

function generateSignature(sdkKey, sdkSecret, meetingNumber, role) {
  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(sdkKey + meetingNumber + timestamp + role).toString('base64');
  const hash = crypto.createHmac('sha256', sdkSecret).update(msg).digest('base64');
  const signature = Buffer.from(`${sdkKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64');

  return signature.replace(/\=+$/, '');
}

app.post('/signature', (req, res) => {
  const { sdkKey, sdkSecret, meetingNumber, role } = req.body;
  if (!sdkKey || !sdkSecret || !meetingNumber || role === undefined) {
    return res.status(400).json({ error: "Faltan parámetros" });
  }

  const signature = generateSignature(sdkKey, sdkSecret, meetingNumber, role);
  res.json({ signature });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
