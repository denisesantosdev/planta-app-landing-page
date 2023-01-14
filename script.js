/* Animations */

const sliders = document.querySelectorAll(".slide-in");

const options = {
  threshold: 0,
  rootMargin: "0px 0px -200px 0px",
};

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("appear");
  });
}, options);

sliders.forEach((slider) => {
  appearOnScroll.observe(slider);
});

/* reviews */

const reviewsContainer = document.querySelector(".reviews-container");
const reviewBtnsContainer = document.querySelector(".review-btns");

const reviews = [
  {
    userName: "CreativeCoder",
    title: "The perfect app for green thumbs",
    review:
      "I've been using this app for a few months now and it's been a game changer for my indoor gardening. The plant care reminders are so helpful and the plant identification feature has saved me a few times. Highly recommend!",
  },
  {
    userName: "AdventureSeeker",
    title: "Helps me keep my indoor jungle thriving",
    review:
      "I never thought I had a green thumb, but this app has made it so easy for me to keep my plants alive and healthy. The plant care information is so detailed and easy to understand, I've been able to expand my collection with confidence.",
  },
  {
    userName: "NatureNerd",
    title: "The ultimate guide to plant care",
    review:
      "I'm so impressed by the amount of information available in this app. Not only does it have a great plant identification feature, but it also has a wealth of care instructions for every type of plant you could think of. It's like having a personal plant expert in your pocket.",
  },
  {
    userName: "FitnessFanatic",
    title: "Changed my gardening game",
    review:
      "As someone who's new to gardening, this app has been a lifesaver. The step-by-step care instructions and plant care reminders make it easy to keep up with my garden, and the plant identification feature helps me learn more about my plants. Highly recommend!",
  },
  {
    userName: "FoodieFrenzy",
    title: "The best plant identification tool out there",
    review:
      "I've been using this app for a few weeks now and I'm blown away by how much it's helped me improve my plant care. The detailed care instructions and plant identification feature are incredibly helpful. I'm so glad I found this app!",
  },
  {
    userName: "BookwormBibliophile",
    title: "Makes plant parenting a breeze",
    review:
      "If you're a plant parent, this app is a must-have. Not only does it help you identify your plants, but it also provides detailed care instructions and reminders. I've been able to keep all of my plants alive and healthy since I started using it.",
  },
  {
    userName: "TechTitan",
    title: "A must-have for any plant lover",
    review:
      "This app is amazing! It has helped me to identify all of my house plants and helped me to care for them better. It also has a social side, where you can share your own plants and see other people's collections. It's a great community of plant lovers.",
  },
];

const reviewInterval = setInterval(populateReviews, 2500);

let index = clickToChangeReview() || 3;

function populateReviews() {
  const reviewInView = document.querySelector("#review-inView");
  reviewInView.classList.add('slide-review')
  const reviewLeft = document.querySelector("#review-left");
  const reviewRight = document.querySelector("#review-right");

  let reviewInCenter = index++; //Math.floor(reviews.length / 2);
  let reviewToTheLeft = reviewInCenter - 1;
  let reviewToTheRight = reviewInCenter + 1;

  if (index <= 0 || reviewToTheLeft == -1) {
    reviewToTheLeft = reviews.length - 1;
  }

  if (index >= reviews.length) {
    index = 0;
    reviewToTheRight = 0;
  }

  reviewInView.innerHTML = `
  <h3 class="font-size-300">${reviews[reviewInCenter].title}</h3>
  <p class="font-size-250">${reviews[reviewInCenter].review}</p>
  <div class="reviewer | flex">
    <span class="font-size-100">${reviews[reviewInCenter].userName}</span>
    <div>
      <img src="img/star.svg" alt="" />
    </div>
  </div>
 `;

  reviewLeft.innerHTML = `
  <h3 class="font-size-300">${reviews[reviewToTheLeft].title}</h3>
  <p class="font-size-250">${reviews[reviewToTheLeft].review}</p>
  <div class="reviewer | flex">
    <span class="font-size-100">${reviews[reviewToTheLeft].userName}</span>
    <div>
      <img src="img/star.svg" alt="" />
    </div>
  </div>
 `;

  reviewRight.innerHTML = `
  <h3 class="font-size-300">${reviews[reviewToTheRight].title}</h3>
  <p class="font-size-250">${reviews[reviewToTheRight].review}</p>
  <div class="reviewer | flex">
    <span class="font-size-100">${reviews[reviewToTheRight].userName}</span>
    <div>
      <img src="img/star.svg" alt="" />
    </div>
  </div>
 `;

  changeSelectedButton(index);
}

function addReviewBtns() {
  for (let i = 0; i < reviews.length; i++) {
    reviewBtnsContainer.innerHTML += `
    <button data-id=${i}  aria-selected="false">
      <span class="screen-reader-only">Review By: ${reviews[i].userName}</span>
    </button>
    `;
  }
}

addReviewBtns();

function changeSelectedButton(reviewId) {
  const btns = reviewBtnsContainer.querySelectorAll("button");
  btns.forEach((btn) => {
    if (btn.dataset.id == reviewId) {
      btn.ariaSelected = "true";
    } else {
      btn.ariaSelected = "false";
    }
  });
}

function slideReviews() {}

function clickToChangeReview(e) {
  reviewBtnsContainer.addEventListener("click", (e) => {
    index = e.target.dataset.id;

    e.target.ariaSelected = "true";

    reviewBtnsContainer.childNodes.forEach((child) => {
      if (child !== e.target) {
        child.ariaSelected = "false";
      }
    });

    changeSelectedButton(index);
    populateReviews();
    return index;
  });
}
