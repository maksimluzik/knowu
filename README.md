# KnowU

Welcome to the KnowU repository! This repository contains the source code, assets, content, and documentation for the official website of **KnowU** (available at [https://knowu.app](https://knowu.app)).

KnowU is a multi-dimensional personality-insights platform designed for both personal self-discovery and organizational team development.

## Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
  - [For Individuals](#for-individuals)
  - [For Teams & Business](#for-teams--business)
- [Pricing & Plans](#pricing--plans)
- [Application Usage & Installation](#application-usage--installation)
- [Website Architecture & Pages](#website-architecture--pages)
- [Branding Guidelines](#branding-guidelines)
- [Local Development Setup](#local-development-setup)
- [Contact & Support](#contact--support)

---

## Introduction

KnowU is your ultimate tool for personal and professional growth, offering a unique blend of self-assessment and peer feedback to provide a comprehensive view of your personality. 

Rather than relying on a single static questionnaire, KnowU triangulates data from:
* **Self-Assessments** (including specialized questionnaires like *Leadership Material*)
* **Moral Decision-Making** (daily ethical dilemmas via the Moral Compass)
* **Peer Observations** (structured feedback and anonymous social games)
* **Social Media Behaviour** (AI analysis of communication styles)
* **AI-Powered Conversations** (personality-aware coaching chat)

All insights are grounded in three established psychological frameworks: **Myers-Briggs Type Indicator (MBTI)**, **DISC**, and the **Big Five (Agreeableness)**, measuring a total of 15 personality traits.

---

## Key Features

### For Individuals
Detailed individual feature documentation is located in [individual.markdown](file:///Users/maksim/Workspace/knowu/individual.markdown) (Live at [knowu.app/individual](https://knowu.app/individual)):

* **Personality Questionnaires**: Answer questions through an intuitive card-swipe interface. Get custom summaries across 15 traits scored from 0–100.
* **Trait Self-Reflection**: Set personal self-scores (1–10 slider) and maintain notes for each trait to compare against AI-generated results.
* **Moral Compass**: Tinder-style swiping game presenting ethical dilemmas to discover what your choices reveal about your personality.
* **Ask Friends (Peer Feedback)**: Request structured evaluations (1–10 scores + comments) from friends or colleagues, automatically grouped by trait.
* **Social Games**: Play **Blind Reveal** (simultaneously revealed group honesty questions) and **Who's Most Likely** (group voting with trophies for winners).
* **Ask AI**: Chat with a personality-aware AI coach that has full context of your scores, peer feedback, self-reflection, and moral decisions.
* **Analytics Dashboard**: Visualize your profile using radar charts, bar graphs, and DISC donut charts.
* **Trait Encyclopedia**: Explore detailed descriptions of all 15 personality traits, highlighting strengths and blind spots.

### For Teams & Business
Detailed business and coaching feature documentation is located in [business.markdown](file:///Users/maksim/Workspace/knowu/business.markdown) (Live at [knowu.app/business](https://knowu.app/business)):

* **GROW Coaching Plans**: Power Goal, Reality, Options, and Will coaching conversations with objective personality data and AI suggestions.
* **Development Discussions**: Structure 1:1 check-ins, identify blind spots (discrepancies between self-assessment and peer ratings), and track progress.
* **Glasl Conflict Prevention Model**: Proactively prevent team conflict. KnowU maps dynamics across Friedrich Glasl’s 9 conflict stages, offering managers early indicators to intervene during Phase 1 (Win/Win).
* **Team Composition**: View aggregate personality distribution across your team to identify coverage gaps and optimize collaboration.
* **Leadership Readiness**: Assess leadership potential with focused alignment scoring and development feedback.

---

## Pricing & Plans
Pricing plans are detailed in [pricing.markdown](file:///Users/maksim/Workspace/knowu/pricing.markdown) (Live at [knowu.app/pricing](https://knowu.app/pricing)):

| Plan | Pricing | Target Audience | Key Included Features |
| :--- | :--- | :--- | :--- |
| **Free** | €0 | Personal self-discovery | Core assessment, 15 trait scores, Moral Compass, limited peer requests (3/mo), AI chat (10/mo) |
| **Professional** | €10 / user / mo | Individuals & Coaches | Unlimited peer requests, unlimited AI chat, growth history tracking, Leadership assessment, social media analysis, PDF exports |
| **Teams** | Custom (Min. 3 users) | Managers, HR & Orgs | GROW templates, team dashboards, manager views, Glasl stage tracking, SSO, dedicated isolated database, priority onboarding |

---

## Application Usage & Installation

The KnowU application can be accessed and installed via:

1. **Web Version**: Open in any desktop or mobile browser at [https://web.knowu.app](https://web.knowu.app).
2. **iOS App (Beta)**: Available via Apple TestFlight. Refer to the TestFlight setup instructions in [ios.markdown](file:///Users/maksim/Workspace/knowu/ios.markdown) (Live at [knowu.app/ios/](https://knowu.app/ios/)).
3. **Android App (Beta)**: Available via Google Play internal testing. Refer to the invitation and installation guide in [android.markdown](file:///Users/maksim/Workspace/knowu/android.markdown) (Live at [knowu.app/android/](https://knowu.app/android/)).

---

## Website Architecture & Pages

Below is a map of the website files in this repository:
* [index.markdown](file:///Users/maksim/Workspace/knowu/index.markdown) - Homepage with core value proposition, audience entryways, and contact forms.
* [individual.markdown](file:///Users/maksim/Workspace/knowu/individual.markdown) - Explains all feature sets for individual users.
* [business.markdown](file:///Users/maksim/Workspace/knowu/business.markdown) - Focuses on GROW plans, 1:1 guides, and Glasl's conflict escalation model.
* [pricing.markdown](file:///Users/maksim/Workspace/knowu/pricing.markdown) - Details plan tiers and contains the Frequently Asked Questions (FAQ).
* [social.markdown](file:///Users/maksim/Workspace/knowu/social.markdown) - Hub linking to Instagram and Facebook pages with live widgets.
* [ios.markdown](file:///Users/maksim/Workspace/knowu/ios.markdown) - Guide to install the app on Apple iOS via TestFlight.
* [android.markdown](file:///Users/maksim/Workspace/knowu/android.markdown) - Guide to install the app on Google Play via internal testing.
* [evaluate.markdown](file:///Users/maksim/Workspace/knowu/evaluate.markdown) - Landing page for peers submitting ratings and feedback.
* [join.markdown](file:///Users/maksim/Workspace/knowu/join.markdown) - Beta program signup form.
* [privacy-policy.markdown](file:///Users/maksim/Workspace/knowu/privacy-policy.markdown) - GDPR compliance and user privacy terms.
* [terms-of-service.markdown](file:///Users/maksim/Workspace/knowu/terms-of-service.markdown) - Terms governing application use.

---

## Branding Guidelines

KnowU maintains a cohesive brand identity focused on professionalism, trust, and growth:

* **Tagline**: *Discover Who You Truly Are*
* **Core Brand Colors**:
  * **Primary Color**: `#00BFC6` (Cyan) - Represents clarity, communication, and self-awareness. Used for primary CTAs, links, and highlights.
  * **Secondary Color**: `#003C58` (Deep Navy) - Conveys trust, stability, and depth. Used for headings, footers, and hover states.
  * **Background Color**: `#FBFEFF` (Off-White) - Clean background ensuring readability and professional layout.
  * **Text Color**: `#424242` (Charcoal) - Used for body copy to prevent harsh contrast.

---

## Local Development Setup

The KnowU marketing website is built using **Jekyll** (with the `minima` theme).

### Prerequisites
Make sure you have Ruby and Bundler installed on your system.

### Steps to Run Locally
1. Clone the repository and navigate to the project root.
2. Install the necessary Ruby gems:
   ```bash
   bundle install
   ```
3. Run the local development server:
   ```bash
   bundle exec jekyll serve --livereload
   ```
   The site will be hosted at `http://localhost:8000`. The `--livereload` flag automatically refreshes the browser when edits are saved.
4. To build the static website files without running a server:
   ```bash
   bundle exec jekyll build
   ```
   The generated site will be placed in the `_site/` directory.

---

## Contact & Support

For any questions, support requests, or partnership inquiries:
* **Support Email**: [support@knowu.app](mailto:support@knowu.app)
* **Administrative Lead**: Maksim Luzik ([maksimluzik.com](https://www.maksimluzik.com) | [me@maksimluzik.com](mailto:me@maksimluzik.com))
