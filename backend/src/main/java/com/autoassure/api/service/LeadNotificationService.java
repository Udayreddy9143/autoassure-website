package com.autoassure.api.service;

import com.autoassure.api.model.Lead;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.Map;

@Service
public class LeadNotificationService {

    private static final Logger log = LoggerFactory.getLogger(LeadNotificationService.class);
    private static final URI RESEND_ENDPOINT = URI.create("https://api.resend.com/emails");

    private final String apiKey;
    private final String fromAddress;
    private final String toAddress;
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public LeadNotificationService(
            @Value("${resend.api-key}") String apiKey,
            @Value("${resend.from}") String fromAddress,
            @Value("${app.mail.to}") String toAddress) {
        this.apiKey = apiKey;
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.httpClient = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(8)).build();
    }

    @Async
    public void notifyNewLead(Lead lead) {
        if (apiKey == null || apiKey.isBlank()) {
            log.warn("resend.api-key is not configured - skipping email notification for lead {}", lead.getId());
            return;
        }

        try {
            String body = objectMapper.writeValueAsString(Map.of(
                    "from", fromAddress,
                    "to", List.of(toAddress),
                    "subject", "New AutoAssure lead: " + lead.getLeadType() + " from " + lead.getName(),
                    "text", buildBody(lead)
            ));

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(RESEND_ENDPOINT)
                    .timeout(Duration.ofSeconds(8))
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 300) {
                log.warn("Resend rejected the notification email ({}): {}", response.statusCode(), response.body());
            } else {
                log.info("Lead notification email sent for lead {}", lead.getId());
            }
        } catch (Exception e) {
            log.warn("Could not send lead notification email (submission was still saved): {}", e.getMessage());
        }
    }

    private String buildBody(Lead lead) {
        return "Type: " + lead.getLeadType() + "\n"
                + "Name: " + lead.getName() + "\n"
                + "Email: " + lead.getEmail() + "\n"
                + "Company: " + (lead.getCompany() == null ? "-" : lead.getCompany()) + "\n"
                + "Message: " + (lead.getMessage() == null ? "-" : lead.getMessage()) + "\n"
                + "Submitted: " + lead.getCreatedAt();
    }
}
