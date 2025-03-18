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

    #rating-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 30%;
        transform: translate(-50%, -50%);
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        z-index: 1000;
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
        if (!questionId || !traitId || !initiatorId || !hash || !encodedQuestion) {
            alert("Missing required data to submit evaluation. Please make sure that the link is the correct one.");
            return; // Stop the function execution
        }

        const endpointBase = "https://script.google.com/macros/s/AKfycbxm4vkKZMhDO1r-rPZcc_bgd3FcsdxpbZG7Tk3Ukr7-U6EzJMv6Tigic5eIHgVmzV-X/exec";
        const requestUrl = `${endpointBase}?endpoint=evaluate_user&questionId=${questionId}&rating=${rating}&traitId=${traitId}&initiatorId=${initiatorId}&hash=${hash}&encodedQuestion=${encodedQuestion}`;

        // Create a popup to indicate submission in progress
        const popup = document.createElement("div");
        popup.id = "rating-popup";
        popup.innerText = "Submitting your evaluation...";
        
        document.body.appendChild(popup);

        // Disable all rating buttons to prevent multiple submissions
        document.querySelectorAll(".rating img").forEach(img => img.style.pointerEvents = "none");

        fetch(requestUrl, {
            redirect: "follow",
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({ rating: rating })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            popup.innerText = `Your evaluation has been registered. Thank you!`;
            const ratingContainer = document.getElementById("rating-container");
            ratingContainer.innerHTML = ""; // Clear previous rating images

            // Display the selected rating using rating-small.png images
            for (let i = 1; i <= 10; i++) {
                const img = document.createElement("img");
                img.src = "/media/ratings/rating-small.png";
                img.alt = `Rating ${i}`;
                img.style.opacity = i <= rating ? "1" : "0.3"; // Highlight selected rating
                img.style.margin = "5px";
                ratingContainer.appendChild(img);
            }

            // Only disable further interactions after a successful evaluation
            ratingContainer.style.pointerEvents = "none";

            // Show the thank-you message
            const thankYouMessage = document.getElementById("thank-you-message");
            thankYouMessage.innerText = "Thank you for evaluating this user! Your vote has been registered. You can close this window.";
            thankYouMessage.style.display = "block";
        })
        .catch(error => {
            popup.innerText = `An error occurred while submitting your evaluation. Please try again. Error: ${error.message}`;

            // Re-enable rating buttons if an error occurs
            document.querySelectorAll(".rating img").forEach(img => img.style.pointerEvents = "auto");
        })
        .finally(() => {
            // Keep the popup visible for a few seconds, then remove it
            setTimeout(() => {
                document.body.removeChild(popup);
            }, 5000);
        });
    }
</script>

<div>
    <p id="question-text">On a scale of 1 to 10, how likely am I to ...</p>
    <p class="small-description">A lower rating indicates a lower evaluation for the given question, meaning the trait or characteristic being assessed is perceived as less evident or prominent. Your evaluations are anonymous.</p>
    <div class="rating" id="rating-container"></div>
    <p id="thank-you-message" class="small-description" style="display: none; text-align: center; margin-top: 10px;"></p>
</div>
