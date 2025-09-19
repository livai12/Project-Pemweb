// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add fade-in class to elements and observe them
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".education-card, .achievement-card, .timeline-item, .stat-item, .contact-item",
  )

  animateElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
})

// Parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallax = document.querySelector(".wave-pattern")
  if (parallax) {
    const speed = scrolled * 0.5
    parallax.style.transform = `translateY(${speed}px) rotate(${scrolled * 0.1}deg)`
  }
})

// Form submission
document.querySelector(".contact-form form").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const name = this.querySelector('input[type="text"]').value
  const email = this.querySelector('input[type="email"]').value
  const message = this.querySelector("textarea").value

  // Simple validation
  if (!name || !email || !message) {
    alert("Please fill in all fields")
    return
  }

  // Simulate form submission
  const submitBtn = this.querySelector(".btn-primary")
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  setTimeout(() => {
    alert("Thank you for your message! I will get back to you soon.")
    this.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Loading animation
window.addEventListener("load", () => {
  const loading = document.querySelector(".loading")
  if (loading) {
    loading.style.opacity = "0"
    setTimeout(() => {
      loading.style.display = "none"
    }, 500)
  }
})

// Add loading screen HTML if it doesn't exist
document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector(".loading")) {
    const loading = document.createElement("div")
    loading.className = "loading"
    loading.innerHTML = '<div class="loading-spinner"></div>'
    document.body.appendChild(loading)
  }
})

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  setTimeout(() => {
    const heroTitle = document.querySelector(".hero-title")
    if (heroTitle) {
      const titleLines = heroTitle.querySelectorAll(".title-line")
      if (titleLines.length > 0) {
        titleLines[0].style.opacity = "0"
        titleLines[1].style.opacity = "0"

        setTimeout(() => {
          titleLines[0].style.opacity = "1"
          typeWriter(titleLines[0], "Anies", 150)
        }, 500)

        setTimeout(() => {
          titleLines[1].style.opacity = "1"
          typeWriter(titleLines[1], "Baswedan", 150)
        }, 1500)
      }
    }
  }, 1000)
})

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  function updateCounter() {
    start += increment
    if (start < target) {
      element.textContent = Math.floor(start) + "+"
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target + "+"
    }
  }

  updateCounter()
}

// Initialize counter animations when stats come into view
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number")
        const text = statNumber.textContent
        const number = Number.parseInt(text.replace(/\D/g, ""))

        if (number) {
          animateCounter(statNumber, number)
          statsObserver.unobserve(entry.target)
        }
      }
    })
  },
  { threshold: 0.5 },
)

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".stat-item").forEach((item) => {
    statsObserver.observe(item)
  })
})

// Add hover effects for cards
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".education-card, .achievement-card")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
})
