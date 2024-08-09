// Based on Jemima Abu's CRUD app tutorial, but tailored to my interest in film reviews
// Huff Global
const reviewsWrapper = document.getElementById("reviews-wrapper");
const title = document.getElementById("title");
const content = document.getElementById("content");
const error = document.getElementById("form-error");

let reviewsData = [];

// Huff Functions
const createReview = (uid, title, text, date) => {
    const review = document.createElement("div");
    review.className = "review";
    review.id = uid;
    review.innerHTML = ` 
        <div class="review-title">${title}</div> 
        <div class="review-controls"> 
            <button class="review-edit" onclick="editReview(${uid})"> 
                Edit 
            </button> 
            <button class="review-save" style="display:none" onclick="saveReview(${uid})"> 
                Save 
            </button> 
            <button class="review-delete" onclick="deleteReview(${uid})"> 
                Delete 
            </button> 
        </div> 
        <div class="review-text">${text}</div> 
        <div class="review-date">${date}</div> 
    `;
    reviewsWrapper.insertBefore(review, reviewsWrapper.firstChild);
};

const addReview = () => {
    if (title.value.trim().length == 0 && content.value.trim().length == 0) {
      error.innerText = "Review cannot be empty";
      return;
    }

    const reviewObj = {
        uid: new Date().getTime().toString(),
        title: title.value,
        text: content.value,
        date: new Date().toLocaleDateString()
    };

    reviewsData.push(reviewObj);
    localStorage.setItem("reviews", JSON.stringify(reviewsData));

    createReview(reviewObj.uid, reviewObj.title, reviewObj.text, reviewObj.date);

    error.innerText = "";
    content.value = "";
    title.value = "";
};

const editReview = (uid) => {
    const review = document.getElementById(uid);
    const reviewTitle = review.querySelector(".review-title");
    const reviewText = review.querySelector(".review-text");
    const reviewSave = review.querySelector(".review-save");
    const reviewEdit = review.querySelector(".review-edit");
    reviewTitle.contentEditable = "true";
    reviewText.contentEditable = "true";
    reviewEdit.style.display = "none";
    reviewSave.style.display = "block";
    reviewText.focus();
};

const saveReview = (uid) => {
    const review = document.getElementById(uid);
    const reviewTitle = review.querySelector(".review-title");
    const reviewText = review.querySelector(".review-text");
    const reviewSave = review.querySelector(".review-save");
    const reviewEdit = review.querySelector(".review-edit");
    if (
      reviewTitle.innerText.trim().length == 0 &&
      reviewText.value.trim().length == 0
    ) {
      error.innerHTML = "Review cannot be empty";
      return;
    }
    reviewsData.forEach((review) => {
      if (review.uid == uid) {
        review.title = reviewTitle.innerText;
        review.text = reviewText.innerText;
      }
    });
    localStorage.setItem("reviews", JSON.stringify(reviewsData));
    reviewTitle.contentEditable = "false";
    reviewText.contentEditable = "false";
    reviewEdit.style.display = "block";
    reviewSave.style.display = "none";
    error.innerText = "";
};

const deleteReview = (uid) => {
    let confirmDelete = confirm("Are you sure you want to delete this review?");
    if (!confirmDelete) {
      return;
    }
    const review = document.getElementById(uid);
    review.parentNode.removeChild(review);
    
    reviewsData = reviewsData.filter((review) => {
      return review.uid != uid;
    });
    localStorage.setItem("reviews", JSON.stringify(reviewsData));
};

window.addEventListener("load", () => {
    reviewsData = localStorage.getItem("reviews")
      ? JSON.parse(localStorage.getItem("reviews"))
      : [];
      
    reviewsData.forEach((review) => {
      createReview(review.uid, review.title, review.text, review.date);
    });
});