---
layout: page
title: A user has requested an evaluation from you with the following question
permalink: /evaluate/
---
<style>
    .rating {
        display: flex;
        justify-content: space-between; /* Distributes images evenly */
        align-items: center;
        width: 100%;
        padding: 0px; /* Adds padding on both sides */
    }

    .rating img {
        flex-grow: 1; /* Makes images stretch within the container */
        width: 30px;
        max-width: 10%; /* Ensures images don't become too large */
        cursor: pointer;
        margin: 5px;
        opacity: 1.0;
        transition: opacity 0.3s;
    }

    .rating img:hover ~ img {
        opacity: 0.5;
    }

    p.small-description {
        font-size: 0.7em;
    }
</style>

<link rel="preload" href="/media/ratings/rating-small.png" as="image" type="image/png">

<script>
    var hash = "";
    var initiatorId = "";
    var traitId = "";
    var questionId = "";
    var encodedQuestion = "";

    document.addEventListener("DOMContentLoaded", function () {
        hash = new URLSearchParams(window.location.search).get("hash");
        initiatorId = new URLSearchParams(window.location.search).get("initiatorId");
        traitId = new URLSearchParams(window.location.search).get("traitId");
        questionId = new URLSearchParams(window.location.search).get("questionId");
        encodedQuestion = new URLSearchParams(window.location.search).get("encodedQuestion");

        // Decode Base64-encoded question
        if (encodedQuestion) {
            try {
                const decodedQuestion = atob(encodedQuestion);
                document.getElementById("question-text").innerText = decodedQuestion;
            } catch (error) {
                console.error("Error decoding question:", error);
                document.getElementById("question-text").innerText = "Error loading question.";
            }
        }

        // Generate rating buttons (1-10 scale)
        const ratingContainer = document.getElementById("rating-container");
        for (let i = 1; i <= 10; i++) {
            const img = document.createElement("img");
            img.src = `/media/ratings/rating.png`;
            img.alt = `Rating ${i}`;
            img.title = `Rating ${i}`;
            img.onclick = function() { submitRating(i); };
            ratingContainer.appendChild(img);
        }
    });

    // Submit rating function
    function submitRating(rating) {
        const endpointBase = "https://script.google.com/macros/s/AKfycbxm4vkKZMhDO1r-rPZcc_bgd3FcsdxpbZG7Tk3Ukr7-U6EzJMv6Tigic5eIHgVmzV-X/exec";
        const requestUrl = `${endpointBase}?endpoint=evaluate_user&questionId=${questionId}&rating=${rating}&traitId=${traitId}&initiatorId=${initiatorId}&hash=${hash}&encodedQuestion=${encodedQuestion}`;

        fetch(requestUrl, {
            redirect: "follow",
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({ rating: rating })
        })
        .then(response => response.json())
        .then(data => alert("Your feedback has been registered. Thank you for your feedback!"))
        .catch(error => alert("Unfortunately, an error occurred while submitting your evaluation. If error persist, please report the issue to support@knowu.app"));
    }
</script>

<div>
    <p id="question-text">On a scale of 1 to 10, how likely am I to spontaneously suggest a karaoke night, even if I can't sing?</p>
    <p class="small-description">A lower rating indicates a lower evaluation for the given question, meaning the trait or characteristic being assessed is perceived as less evident or prominent.</p>
    <div class="rating" id="rating-container"></div>
</div>
