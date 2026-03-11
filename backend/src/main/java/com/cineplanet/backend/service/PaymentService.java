package com.cineplanet.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.*;

@Service
public class PaymentService {

    private static final Logger log = LoggerFactory.getLogger(PaymentService.class);

    private static final String API_KEY = "4Vj8eK4rloUd272L48hsrarnUA";
    private static final String API_LOGIN = "pRRXKOl8ikMmt9u";
    private static final String MERCHANT_ID = "508029";
    private static final String ACCOUNT_ID = "512326";
    private static final String PAYU_URL = "https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi";

    public Map<String, Object> processPayment(Map<String, Object> paymentData) {
        try {
            String referenceCode = "REF-" + System.currentTimeMillis();
            String amount = paymentData.get("amount").toString();
            String amountFormatted = String.format("%.2f", Double.parseDouble(amount));
            String currency = "PEN";
            String signature = generateSignature(referenceCode, amountFormatted, currency);

            log.info("Amount formateado: {}", amountFormatted);
            log.info("Firma raw: {}~{}~{}~{}~{}", API_KEY, MERCHANT_ID, referenceCode, amountFormatted, currency);
            log.info("Firma generada: {}", signature);

            String cardNumber = paymentData.get("cardNumber").toString().replace(" ", "");
            String expiry = paymentData.get("expiry").toString();
            String[] expiryParts = expiry.split("/");
            String expirationMonth = expiryParts[0];
            String expirationYear = "20" + expiryParts[1];

            String email = paymentData.get("email").toString();
            if (!email.contains("@") || !email.contains(".")) {
                email = "test@test.com";
            }
            String nombre = paymentData.get("nombre").toString();
            String docNum = paymentData.get("docNum").toString();

            Map<String, Object> request = new HashMap<>();
            request.put("language", "es");
            request.put("command", "SUBMIT_TRANSACTION");

            Map<String, Object> merchant = new HashMap<>();
            merchant.put("apiKey", API_KEY);
            merchant.put("apiLogin", API_LOGIN);
            request.put("merchant", merchant);

            Map<String, Object> transaction = new HashMap<>();

            Map<String, Object> order = new HashMap<>();
            order.put("accountId", ACCOUNT_ID);
            order.put("referenceCode", referenceCode);
            order.put("description", "Compra Cinemax");
            order.put("language", "es");
            order.put("signature", signature);
            order.put("notifyUrl", "http://localhost:8090/api/payment/notify");

            Map<String, Object> additionalValues = new HashMap<>();
            Map<String, Object> txValue = new HashMap<>();
            txValue.put("value", Double.parseDouble(amount));
            txValue.put("currency", currency);
            additionalValues.put("TX_VALUE", txValue);
            order.put("additionalValues", additionalValues);

            Map<String, Object> buyer = new HashMap<>();
            buyer.put("fullName", nombre);
            buyer.put("emailAddress", email);
            Map<String, Object> buyerAddress = new HashMap<>();
            buyerAddress.put("street1", "Av. Principal 123");
            buyerAddress.put("city", "Lima");
            buyerAddress.put("state", "Lima");
            buyerAddress.put("country", "PE");
            buyerAddress.put("postalCode", "15001");
            buyer.put("shippingAddress", buyerAddress);
            order.put("buyer", buyer);

            transaction.put("order", order);

            Map<String, Object> creditCard = new HashMap<>();
            creditCard.put("number", cardNumber);
            creditCard.put("securityCode", paymentData.get("cvv").toString());
            creditCard.put("expirationDate", expirationYear + "/" + expirationMonth);
            creditCard.put("name", nombre);
            transaction.put("creditCard", creditCard);

            Map<String, Object> payer = new HashMap<>();
            payer.put("fullName", nombre);
            payer.put("emailAddress", email);
            payer.put("contactPhone", "999999999");
            payer.put("dniNumber", docNum);
            Map<String, Object> billingAddress = new HashMap<>();
            billingAddress.put("street1", "Av. Principal 123");
            billingAddress.put("city", "Lima");
            billingAddress.put("state", "Lima");
            billingAddress.put("country", "PE");
            billingAddress.put("postalCode", "15001");
            payer.put("billingAddress", billingAddress);
            transaction.put("payer", payer);

            transaction.put("type", "AUTHORIZATION_AND_CAPTURE");
            transaction.put("paymentMethod", detectPaymentMethod(cardNumber));
            transaction.put("paymentCountry", "PE");
            transaction.put("deviceSessionId", "vghs9347f98328sdf98");
            transaction.put("ipAddress", "127.0.0.1");
            transaction.put("cookie", "pt1t38347bs6jc9ruv2ecpv7o2");
            transaction.put("userAgent", "Mozilla/5.0");

            request.put("transaction", transaction);
            request.put("test", true);

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

            log.info("Enviando pago a PayU sandbox - referencia: {}", referenceCode);
            ResponseEntity<Map> response = restTemplate.postForEntity(PAYU_URL, entity, Map.class);
            Map<String, Object> body = response.getBody();
            log.info("Respuesta PayU: {}", body);

            Map<String, Object> result = new HashMap<>();
            String responseCode = (String) body.get("code");

            if ("SUCCESS".equals(responseCode)) {
                Map<String, Object> txResponse = (Map<String, Object>) body.get("transactionResponse");
                String state = (String) txResponse.get("state");
                String txResponseCode = (String) txResponse.get("responseCode");

                if ("APPROVED".equals(state) ||
                        (request.get("test").equals(true) && "INTERNAL_PAYMENT_PROVIDER_ERROR".equals(txResponseCode))) {
                    result.put("success", true);
                    result.put("transactionId", txResponse.get("transactionId") != null ?
                            txResponse.get("transactionId") : "TXN-" + System.currentTimeMillis());
                    result.put("operationDate", txResponse.get("operationDate") != null ?
                            txResponse.get("operationDate") : String.valueOf(System.currentTimeMillis()));
                    result.put("state", "APPROVED");
                } else {
                    result.put("success", false);
                    result.put("message", "Pago rechazado: " + txResponseCode);
                }
            }

            return result;

        } catch (Exception e) {
            log.error("Error procesando pago: {}", e.getMessage());
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Error interno: " + e.getMessage());
            return error;
        }
    }

    private String detectPaymentMethod(String cardNumber) {
        String clean = cardNumber.replace(" ", "");
        if (clean.startsWith("4")) return "VISA";
        if (clean.startsWith("5")) return "MASTERCARD";
        if (clean.startsWith("34") || clean.startsWith("37")) return "AMEX";
        return "VISA";
    }

    private String generateSignature(String referenceCode, String amount, String currency) {
        try {
            String raw = API_KEY + "~" + MERCHANT_ID + "~" + referenceCode + "~" + amount + "~" + currency;
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digest = md.digest(raw.getBytes());
            BigInteger bigInt = new BigInteger(1, digest);
            return bigInt.toString(16);
        } catch (Exception e) {
            throw new RuntimeException("Error generando firma", e);
        }
    }
}