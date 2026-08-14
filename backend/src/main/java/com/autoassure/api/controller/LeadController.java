package com.autoassure.api.controller;

import com.autoassure.api.dto.LeadRequest;
import com.autoassure.api.model.Lead;
import com.autoassure.api.repository.LeadRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
public class LeadController {

    private static final Logger log = LoggerFactory.getLogger(LeadController.class);

    private final LeadRepository leadRepository;

    public LeadController(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    @PostMapping("/api/leads")
    public ResponseEntity<Void> submitLead(@Valid @RequestBody LeadRequest request) {
        Lead lead = new Lead();
        lead.setLeadType(request.getLeadType());
        lead.setName(request.getName());
        lead.setEmail(request.getEmail());
        lead.setCompany(request.getCompany());
        lead.setMessage(request.getMessage());
        lead.setCreatedAt(Instant.now());

        leadRepository.save(lead);
        log.info("New {} lead from {} <{}>", lead.getLeadType(), lead.getName(), lead.getEmail());

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
