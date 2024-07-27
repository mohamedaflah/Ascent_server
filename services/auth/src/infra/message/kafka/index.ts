import { readFileSync } from "fs";
import { Kafka, Producer, Consumer, logLevel } from "kafkajs";
import path from "path";
import { otpProducer } from "./producers/otpProducer";

const CA = `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUY4xncUE8kbuE5Mo+04AYlrWRmhQwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvZWQzY2E2MDYtMzVmNi00YjBiLWE4MzUtZmQ1YWM4MGY4
M2I5IFByb2plY3QgQ0EwHhcNMjQwNDEyMDY1NDU4WhcNMzQwNDEwMDY1NDU4WjA6
MTgwNgYDVQQDDC9lZDNjYTYwNi0zNWY2LTRiMGItYTgzNS1mZDVhYzgwZjgzYjkg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKrBOIBH
F+9NT1ZnNg99HlYnF/anq322tT391gFP1iaQFb7+lmErJ904rPjeV/xg/vcz5nQi
h3Nmv34xHTUIfbf6lzW7bxt32M3KkkQpC2NwZHIl7Rh2Fr+kuEmZtR4vwudtDp46
xHczh8irr417Yc9t3F7/c2j/rsHTzuU9+dfYdVSAxT8z5zBXbjY4oDcgxDKIfvpP
jffina0o684zjOELFG/2yZhEQbe6cAE5Pw44evrJqGDpBVytguFSh+6Xm0h95biO
7y0ZCNrfrNLdfZUU9GZYXURtecLlTJ6zZjX3fZNR5VXo3h0QiVQw655JxYVjF+s5
tWZTUHhJR7QuLalhZu1aVLikpJD1sXf3MltDoKaX/nt3tSk3GeKVZWgYATK1IWCF
rb8mrnf1zPx+1+/1UjQ+3aeR57yWGlXWXaUXzK/LkRPg/V/Kq71iPUsWp8WhGvkf
xhm0gnWWMdsx4vzfr328UV5Wa5JFJr4i4CC9RZNOWudHKx+YG8v27PezgwIDAQAB
oz8wPTAdBgNVHQ4EFgQUs3qKJQujialQ5LAxQEfuy4vAbCIwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAF9IsnYdPkqHnbFf
kH3ju9TQ2GKXcR/AmTKEfgcQbqhwZ6WLbcUqe6BXSBWwEVZ9Mwn/0lsCBLe053yx
f5VU/p20sck2Ra6Sn9JMJ2D8tU8pig+DYX5+J6++TYKJefLYtoVoFWae33j9pMcQ
dwlCHTd7pakCIyMdmQq0HH29vUeSlwjjDeMYvj44oGcCck335eC06m6OJT4xYtfS
WCS2NT+oSRedSKKZt/XYRp9hEJVnDYy9H3tojrP4cTKdX0rWScyZFEiA5c4ravLq
TS6vOp+JA392s4Owh3lSz2/FVHFq/8Qi0zKu3hdMrgUqdSEPS2yeFtSD+tzPl0W4
9qhH1mKWiL4tlfSQAzmXM95eWU7tCCqof24cWshJOC+JfQLuyFy6/jjDYyb6EhkL
foXkf55PcZer2bIXiMF9ur86CVBth7ydDDRmatdgLUZU4qW9WGpsliR+OSxizvhR
OtfKQCccffHnPORBuOSC6logyU16ddC+cbCGT8qrCMxmKPptvA==
-----END CERTIFICATE-----
`;

const SERVICE_KEY = `-----BEGIN PRIVATE KEY-----
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
fd7lqhvAbNbxdVu5VS9nlg==
-----END PRIVATE KEY-----
`;

const SERVER_CERT = `-----BEGIN CERTIFICATE-----
MIIEYTCCAsmgAwIBAgIUJkNejpqWSS3IJ/QSvEyfOL6Hg/8wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvZWQzY2E2MDYtMzVmNi00YjBiLWE4MzUtZmQ1YWM4MGY4
M2I5IFByb2plY3QgQ0EwHhcNMjQwNzI3MTAwNTQyWhcNMjYxMDI1MTAwNTQyWjA/
MRcwFQYDVQQKDA5rYWZrYS0xNDRjMmI2YjERMA8GA1UECwwIdThsOGI2YTAxETAP
BgNVBAMMCGF2bmFkbWluMIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEA
iCBXBswiBOOwQDDNwn6p80hc4TporuHK1nrdwUajpxEPvUm72THSXOH7JGnQJjoi
ATrkdVqIsRNJi4FjkdMDzoyC0qsAp+5Au1KyHddswuNHXI6AaTf8SOqL+0V0zGLh
+nPcO7fm9BOeTtwLRy7PdOpEZW7vfJaLqoov8vykfy0YO8jgbnahWgyaFwkw/ble
RSeAIWiViQSxF1m2809GALS4VioQphn/whZcpYZnBSYlBkUECtDqIM4m6ILmkMpH
Ls3sWGKFaY0ERnUQMI4KLxSKRIpQnZKWl/h/uglk3U+5ozjk7vg8cugIH82XzntM
qGzFuSGKeKKOegh67juC8Vk+j3J0zoB3GZyx1rOUSFxkZQbMqB2DqZ0foWV3vul5
Mb60gqWDcym+2FwO5IlrHQS2ho3/1On7GCViB4vY6zVdir/NENGGAbOC6k7tDDa2
B/sXpDMgHazJLi4r62DZxdbNQ2RgL1Wwj84RNyolQauzO/5VgzQ5oNdZlZv2dNtF
AgMBAAGjWjBYMB0GA1UdDgQWBBR58nk9QeR4SC2wfXnzG4zMv36oYDAJBgNVHRME
AjAAMAsGA1UdDwQEAwIFoDAfBgNVHSMEGDAWgBSzeoolC6OJqVDksDFAR+7Li8Bs
IjANBgkqhkiG9w0BAQwFAAOCAYEARHYAy1b8I1ed3ySG/URi6fFB9fY805O0yEuZ
OlOkErPW60x3UAIQuJJPyVdXWATNcJkr4z4b8dFl9KqeBHNAmnUesycHDS5Oa3mH
PxVdPk1oih+Cjyw5Y54LYzuBFelmhkmZeL7JSaliAJoNd68o95w/SNeFw2kRL1xk
wIGMkloc17vYi0Uj44+SgYJTnPo+TkmBDZYyJkuarwhJOfIeeuyVb0CJs086iQ18
K4KrGgpwZSKncGKkhMC1MCvaxr8RJl/fSQXH+Ok4oAxYCug4j9JrB0bmyiHAY/yA
7Tw914wXmUZ+tsnwPvXsaoUGkVyQ+pG8oXWUytHj2VZl88wfYLPIh8bySUdB0ldR
iAdwWrJgMvwn5nC3e+ns7pjDRU6uNOxj3lkT09zset5fZQ6PmUbzgSIHoZUcfKC3
bRC4JBLq2dT5IRtoebLSwAJmv8QDy8Mls6LIUbMQEa4ehy47BcEnY6GEdiwfSScL
f0N6IS1hK6QACR0GvMyx7/Fjtv2k
-----END CERTIFICATE-----
`;

const sslOptions = {
  rejectUnauthorized: true,
  ca: [CA],
  key: SERVICE_KEY,
  cert: SERVER_CERT,
};

const kafka = new Kafka({
  clientId: String(process.env.KAFKA_CLIENT_ID),
  brokers: [String(process.env.KAFKA_BROKER_URL)],
  ssl: sslOptions, // removed this much code for development

  sasl: {
    mechanism: "scram-sha-256",
    username: String(process.env.KAFKA_USER_NAME),
    password: String(process.env.KAFKA_PASSWORD),
  },
  logLevel: logLevel.WARN,
});

export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({
  groupId: String(process.env.AUTH_SERVICE_KAFKA_GROUP_ID),
});
otpProducer({ email: "koolathaflah@gmail.com", tag: `<h1>helioasfd</h1>` });
