---
layout: page
title: An acquaintance has asked you to evaluate this question
permalink: /evaluate/
---

<style>
    .rating {
        display: flex;
        justify-content: space-between; /* Distributes images evenly */
        align-items: center;
        width: 100%;
        padding: 10px 0; /* Add space above and below */
        flex-wrap: wrap; /* Allow items to wrap if needed */
    }

    .rating img {
        width: 8vw; /* Scale dynamically with viewport width */
        max-width: 30px; /* Prevent excessive scaling */
        cursor: pointer;
        margin: 5px;
        opacity: 1.0;
        transition: opacity 0.3s;
    }

    @media (max-width: 480px) {
        .rating img {
            max-width: 20px; /* Ensure better visibility on small screens */
        }
    }

    .rating-label {
        text-align: center;
        font-size: 0.8em;
        color: #666;
        display: block;
        margin-top: -5px;
    }

    .rating.evaluated img {
        opacity: 0.1; /* Reduce visibility when already evaluated */
        pointer-events: none; /* Prevent further interaction */
    }

    .rating img:hover ~ img {
        opacity: 0.1;
    }

    div.evaluation-container {
        display: block;
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

    #comment-input {
        display: block;
        width: 100%;
        max-width: 100%; /* Ensure it stays within the parent container */
        box-sizing: border-box; /* Prevents the element from exceeding container width */
        margin-top: 15px; /* Maintain spacing */
        padding: 8px;
        border-radius: 5px;
        border: 1px solid #ccc;
        resize: vertical; /* Allow resizing but prevent overlap */
        font-family: "Roboto", "Helvetica Neue", Arial, sans-serif; /* KnowU default font */
        font-size: 16px;
        color: #424242; /* KnowU text color */
        background-color: #FBFEFF; /* KnowU background color */
    }

    #submit-button {
        display: block;
        width: 100%; /* Makes button stretch fully */
        margin-top: 10px;
        padding: 12px;
        background-color: #00BFC6; /* KnowU primary color */
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        transition: background-color 0.3s, transform 0.1s;
    }

    #submit-button:hover {
        background-color: #0097A7; /* Slightly darker cyan on hover */
    }

    #submit-button:active {
        background-color: #00788A; /* Even darker shade on click */
        transform: scale(0.98); /* Slight press effect */
    }
</style>

<script>
    var hash = "";
    var initiatorId = "";
    var traitId = "";
    var questionId = "";
    var encodedQuestion = "";
    let selectedRating = null; // Variable to store selected rating

    function setEvaluationCookie() {
        const expirationDays = 365; // Cookie expires in 1 year
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + expirationDays);
        document.cookie = `evaluated_${initiatorId}_${questionId}=true; expires=${expirationDate.toUTCString()}; path=/`;
    }

    function getEvaluationCookie() {
        const cookieKey = `evaluated_${initiatorId}_${questionId}`;
        return document.cookie.split('; ').some(cookie => cookie.startsWith(cookieKey + "="));
    }

    document.addEventListener("DOMContentLoaded", function () {
        hash = new URLSearchParams(window.location.search).get("hash");
        initiatorId = new URLSearchParams(window.location.search).get("initiatorId");
        traitId = new URLSearchParams(window.location.search).get("traitId");
        questionId = new URLSearchParams(window.location.search).get("questionId");
        encodedQuestion = new URLSearchParams(window.location.search).get("encodedQuestion");

        if (encodedQuestion) {
            try {
                const decodedQuestion = atob(encodedQuestion);
                document.getElementById("question-text").innerText = decodedQuestion;
            } catch (error) {
                console.error("Error decoding question:", error);
                document.getElementById("question-text").innerText = "Error loading question.";
            }
        }

        const ratingContainer = document.getElementById("rating-container");

        for (let i = 1; i <= 10; i++) {
            const container = document.createElement("div");
            container.style.display = "flex";
            container.style.flexDirection = "column";
            container.style.alignItems = "center";

            const img = document.createElement("img");
            img.src = `/media/ratings/rating.png`;
            img.alt = `Rating ${i}`;
            img.title = `Rating ${i}`;
            img.onclick = function() { 
                selectedRating = i;
                highlightSelectedRating(i);
            };

            const label = document.createElement("span");
            label.className = "rating-label";
            label.innerText = i;

            container.appendChild(img);
            container.appendChild(label);
            ratingContainer.appendChild(container);
        }

        if (getEvaluationCookie()) {
            document.getElementById("rating-container").style.pointerEvents = "none";
            document.getElementById("comment-input").disabled = true;
            document.getElementById("submit-button").disabled = true;
            // Add the evaluated class to reduce opacity
            document.getElementById("rating-container").classList.add("evaluated");

            // Show message indicating the user has already evaluated
            const evaluationMessage = document.getElementById("evaluation-message");
            evaluationMessage.innerText = "You have already evaluated this user for this question.";
            evaluationMessage.style.display = "block";
            return;
        }

        // Attach event listener to submit button
        document.getElementById("submit-button").addEventListener("click", function() {
            submitRating();
        });
    });

    // Function to highlight selected rating
    function highlightSelectedRating(rating) {
        document.querySelectorAll(".rating img").forEach((img, index) => {
            img.style.opacity = index < rating ? "1" : "0.3"; // Highlight selected rating
        });
    }

    // Function to submit evaluation
    function submitRating() {
        if (!selectedRating) {
            alert("Please select a rating before submitting.");
            return;
        }

        if (!questionId || !traitId || !initiatorId || !hash || !encodedQuestion) {
            alert("Missing required data to submit evaluation. Please make sure that the link is the correct one.");
            return;
        }

        const comment = document.getElementById("comment-input").value.trim();
        const endpointBase = "https://script.google.com/macros/s/AKfycbxm4vkKZMhDO1r-rPZcc_bgd3FcsdxpbZG7Tk3Ukr7-U6EzJMv6Tigic5eIHgVmzV-X/exec";
        const requestUrl = `${endpointBase}?endpoint=evaluate_user&hash=${hash}&questionId=${questionId}&traitId=${traitId}&initiatorId=${initiatorId}&encodedQuestion=${encodedQuestion}&rating=${selectedRating}&comment=${encodeURIComponent(comment)}`;

        // Create a popup to indicate submission in progress
        const popup = document.createElement("div");
        popup.id = "rating-popup";
        popup.innerText = "Submitting your evaluation...";
        document.body.appendChild(popup);

        // Disable submit button to prevent multiple submissions
        document.getElementById("submit-button").disabled = true;

        fetch(requestUrl, {
            redirect: "follow",
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({ rating: selectedRating, comment: comment })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            popup.innerText = `Your evaluation has been registered. Thank you!`;
            
            document.getElementById("rating-container").style.pointerEvents = "none"; // Disable rating selection
            document.getElementById("comment-input").disabled = true; // Disable comment input
            document.getElementById("submit-button").disabled = true; // Disable submit button permanently

            // Store evaluation cookie to prevent duplicate submissions
            setEvaluationCookie();

            // Show evaluation message
            const evaluationMessage = document.getElementById("evaluation-message");
            evaluationMessage.innerText = "Thank you for evaluating this user! Your vote has been registered.";
            evaluationMessage.style.display = "block";
        })
        .catch(error => {
            popup.innerText = `An error occurred while submitting your evaluation. Please try again.`;
            
            // Update evaluation message with the error
            const evaluationMessage = document.getElementById("evaluation-message");
            evaluationMessage.innerText = `An error occurred: ${error.message}`;
            evaluationMessage.style.display = "block";

            document.getElementById("submit-button").disabled = false; // Re-enable submit button
        })
        .finally(() => {
            setTimeout(() => {
                document.body.removeChild(popup);
            }, 5000);
        });
    }
</script>

<div class="evaluation-container">
    <h3 id="question-text">On a scale of 1 to 10, how likely am I to ...</h3>
    <p class="small-description">A lower rating indicates a lower evaluation for the given question, meaning the trait or characteristic being assessed is perceived as less evident or prominent. Your evaluations are anonymous.</p>
    <div class="rating" id="rating-container"></div>
    <textarea id="comment-input" placeholder="Optional: Add a comment about this evaluation" rows="3" style="width: 100%; margin-top: 10px;"></textarea>
    <p id="evaluation-message" class="small-description" style="display: none; text-align: center; margin-top: 10px;"></p>
    <button id="submit-button" style="display: block;">Submit Evaluation</button>
</div>
