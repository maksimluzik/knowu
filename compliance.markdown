---
layout: page
title: Security & Compliance
description: "KnowU Security & Compliance Summary — Overview of security practices, compliance controls, and data governance."
keywords: "KnowU compliance, ISO 27001, SOC 2, HIPAA, security controls, data governance"
permalink: /compliance/
---

KnowU is built with enterprise-grade security controls and design principles to ensure user data remains confidential, private, and secure. We align our security infrastructure and data governance models with major industry standards, including **ISO/IEC 27001:2022**, **SOC 2 Type II (Security & Confidentiality)**, and the **HIPAA Security & Privacy Rules (45 CFR Parts 160, 162, and 164)**.

To minimize our attack surface and ensure platform security, detailed technical designs and network topologies are omitted from this public summary.

---

## 1. Security Architecture Summary

KnowU employs a modern, decoupled serverless architecture hosted on secure, certified cloud infrastructure.

* **Defense in Depth**: Access controls, transport security, and application-layer firewalls are implemented hierarchically.
* **Service Isolation**: Computing environments, authentication services, and data storage systems are fully decoupled.
* **Infrastructure Security**: Our hosting providers maintain industry-leading physical and network-level security controls (ISO 27001, SOC 2, and PCI-DSS certified data centers).

> [!NOTE]
> Detailed network topology diagrams and infrastructure flowcharts can be provided to enterprise partners under a Non-Disclosure Agreement (NDA).

---

## 2. Compliance Mapping Matrix

The following matrix outlines the high-level security controls implemented within the KnowU platform:

<div class="compliance-table-wrapper">
  <table class="compliance-table">
    <thead>
      <tr>
        <th>Control Category</th>
        <th>ISO 27001 Control</th>
        <th>SOC 2 Criteria</th>
        <th>HIPAA Section</th>
        <th>Public Implementation Summary</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Access Control &amp; Identity</strong></td>
        <td>A.5.15, A.8.20</td>
        <td>CC6.1, CC6.2, CC6.3</td>
        <td>§164.312(a)(1)</td>
        <td>Secure user registration, hashed credentials, and federated Single Sign-On (SSO) are enforced. Access to user documents is restricted at the database layer using rules and at the API layer using token validation.</td>
      </tr>
      <tr>
        <td><strong>Data Encryption in Transit</strong></td>
        <td>A.8.24</td>
        <td>CC6.6, CC6.7</td>
        <td>§164.312(e)(1)</td>
        <td>All communication with frontend interfaces, backend endpoints, and third-party APIs is enforced over secure HTTPS using TLS 1.2 or TLS 1.3. CORS policies are strictly configured.</td>
      </tr>
      <tr>
        <td><strong>Data Encryption at Rest</strong></td>
        <td>A.8.24</td>
        <td>CC6.6, CC6.7</td>
        <td>§164.312(a)(2)(iv)</td>
        <td>All database entries, storage files, and analytics warehouses are encrypted automatically at rest using AES-256 under managed encryption keys.</td>
      </tr>
      <tr>
        <td><strong>Audit Logging &amp; Logs</strong></td>
        <td>A.8.15, A.8.16</td>
        <td>CC7.1, CC7.2</td>
        <td>§164.312(b)</td>
        <td>Centralized operations logging records backend invocations, system execution tracks, errors, and scheduled functions. Access to logs is restricted via strict IAM roles.</td>
      </tr>
      <tr>
        <td><strong>Least Privilege &amp; Isolation</strong></td>
        <td>A.5.18, A.8.22</td>
        <td>CC6.3</td>
        <td>§164.312(a)(2)(ii)</td>
        <td>Database security rules enforce that users can only read and write their own documents. Cross-user relations require mutual validation, and no user can access another's AI conversation history.</td>
      </tr>
      <tr>
        <td><strong>AI Safety &amp; Data Governance</strong></td>
        <td>A.8.10, A.8.12</td>
        <td>CC6.5, CC8.1</td>
        <td>§164.502</td>
        <td>AI workflows run server-side using secure API channels. Prompt payloads are strictly validated. No PII/PHI is transmitted to unapproved models, and user prompts are not used for public model training.</td>
      </tr>
      <tr>
        <td><strong>Right to Erasure / Data Purge</strong></td>
        <td>A.8.10, A.8.11</td>
        <td>CC6.5</td>
        <td>§164.312(d)</td>
        <td>A self-serve account deletion flow scrubs user credentials, permanently deletes user database records, related subcollections, friendships, and peer feedback references.</td>
      </tr>
      <tr>
        <td><strong>Vulnerability Management</strong></td>
        <td>A.8.8</td>
        <td>CC7.1</td>
        <td>§164.308(a)(1)(ii)(A)</td>
        <td>Package dependencies are monitored during build time. Static analysis scripts execute automated vulnerability scans during the integration pipeline.</td>
      </tr>
    </tbody>
  </table>
</div>

---

## 3. Detailed Security Documentation Requests

To protect the integrity of the platform, specific API endpoints, database schemas, and codebase configurations are not disclosed publicly.

We can provide qualified partners, HR departments, and enterprise customers with our comprehensive security packet upon request. This packet includes:
* Detailed system architecture and network data flow diagrams
* Specific technical control implementations and database rules configurations
* Completed security questionnaires (e.g., CAIQ or custom spreadsheets)
* Data Processing Agreements (DPA) and Business Associate Agreements (BAA) for HIPAA compliance

### Requesting the Security Packet

If you are an administrator, security officer, or HR lead evaluating KnowU for your organization, please contact us at **[security@knowu.app](mailto:security@knowu.app)** or **[support@knowu.app](mailto:support@knowu.app)** to request access to the security packet.
