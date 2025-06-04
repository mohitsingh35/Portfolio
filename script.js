// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Toggle mobile menu with enhanced animations
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    const icon = navToggle.querySelector(".material-symbols-outlined")
    icon.textContent = navMenu.classList.contains("active") ? "close" : "menu"

    // Add glow effect when menu is active
    if (navMenu.classList.contains("active")) {
      navToggle.style.boxShadow = "0 0 20px rgba(0, 255, 255, 0.5)"
    } else {
      navToggle.style.boxShadow = "none"
    }
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      const icon = navToggle.querySelector(".material-symbols-outlined")
      icon.textContent = "menu"
      navToggle.style.boxShadow = "none"
    })
  })

  // Enhanced smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })

        // Add temporary glow effect to clicked link
        this.style.textShadow = "0 0 15px var(--neon-cyan)"
        setTimeout(() => {
          this.style.textShadow = ""
        }, 1000)
      }
    })
  })

  // Active navigation link highlighting with neon effects
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section")
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          link.style.color = ""
          link.style.textShadow = ""
        })
        if (navLink) {
          navLink.classList.add("active")
          navLink.style.color = "var(--neon-cyan)"
          navLink.style.textShadow = "0 0 10px var(--neon-cyan)"
        }
      }
    })
  }

  // Enhanced navbar background on scroll
  function updateNavbarBackground() {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(16, 16, 26, 0.95)"
      navbar.style.boxShadow = "0 4px 20px rgba(0, 255, 255, 0.1)"
    } else {
      navbar.style.background = "rgba(16, 16, 26, 0.8)"
      navbar.style.boxShadow = "none"
    }
  }

  // Enhanced scroll animations with stagger effect
  function animateOnScroll() {
    const elements = document.querySelectorAll(".scroll-animate")
    const windowHeight = window.innerHeight

    elements.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < windowHeight - elementVisible) {
        setTimeout(() => {
          element.classList.add("animate")
        }, index * 100) // Stagger animation
      }
    })
  }

  // Add scroll-animate class to elements
  function addScrollAnimations() {
    const animatedElements = [
      ".about-content > *",
      ".timeline-item",
      ".project-card",
      ".skill-category",
      ".contact-content > *",
    ]

    animatedElements.forEach((selector) => {
      const elements = document.querySelectorAll(selector)
      elements.forEach((element) => {
        element.classList.add("scroll-animate")
      })
    })
  }

  // Initialize scroll animations
  addScrollAnimations()

  // Scroll event listeners with throttling
  let ticking = false
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveNavLink()
        updateNavbarBackground()
        animateOnScroll()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener("scroll", handleScroll)

  // Initial calls
  updateActiveNavLink()
  updateNavbarBackground()
  animateOnScroll()

  // Enhanced contact form functionality
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = new FormData(contactForm)
      const name = formData.get("name")
      const email = formData.get("email")
      const message = formData.get("message")

      // Enhanced validation with visual feedback
      if (!name || !email || !message) {
        showNotification("Please fill in all fields.", "error")
        highlightEmptyFields()
        return
      }

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address.", "error")
        highlightInvalidEmail()
        return
      }

      // Enhanced form submission animation
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalText = submitButton.innerHTML

      submitButton.innerHTML = '<span class="material-symbols-outlined">hourglass_empty</span>Sending...'
      submitButton.disabled = true
      submitButton.style.background = "linear-gradient(45deg, var(--neon-purple), var(--neon-pink))"

      // Add sending animation
      submitButton.style.animation = "btn-glow-pulse 1s ease-in-out infinite"

      setTimeout(() => {
        showNotification("Thank you for your message! I'll get back to you soon.", "success")
        contactForm.reset()
        submitButton.innerHTML = originalText
        submitButton.disabled = false
        submitButton.style.background = ""
        submitButton.style.animation = ""

        // Add success glow effect
        contactForm.style.boxShadow = "0 0 30px rgba(57, 255, 20, 0.3)"
        setTimeout(() => {
          contactForm.style.boxShadow = ""
        }, 2000)
      }, 2000)
    })
  }

  // Enhanced utility functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function highlightEmptyFields() {
    const inputs = contactForm.querySelectorAll(".form-input")
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.style.borderColor = "var(--neon-pink)"
        input.style.boxShadow = "0 0 15px rgba(255, 20, 147, 0.5)"
        setTimeout(() => {
          input.style.borderColor = ""
          input.style.boxShadow = ""
        }, 3000)
      }
    })
  }

  function highlightInvalidEmail() {
    const emailInput = contactForm.querySelector("#email")
    emailInput.style.borderColor = "var(--neon-pink)"
    emailInput.style.boxShadow = "0 0 15px rgba(255, 20, 147, 0.5)"
    setTimeout(() => {
      emailInput.style.borderColor = ""
      emailInput.style.boxShadow = ""
    }, 3000)
  }

  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`

    const iconMap = {
      success: "check_circle",
      error: "error",
      info: "info",
    }

    const colorMap = {
      success: "var(--neon-green)",
      error: "var(--neon-pink)",
      info: "var(--neon-cyan)",
    }

    notification.innerHTML = `
            <span class="material-symbols-outlined" style="color: ${colorMap[type]};">
                ${iconMap[type]}
            </span>
            <span>${message}</span>
        `

    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            color: var(--md-sys-color-on-surface);
            padding: 16px 24px;
            border-radius: var(--md-sys-shape-corner-medium);
            border: 1px solid ${colorMap[type]};
            box-shadow: 0 0 20px ${colorMap[type]}40;
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 10000;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 400px;
            font-weight: 500;
        `

    document.body.appendChild(notification)

    // Enhanced animation
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Pulse effect for success/error
    if (type !== "info") {
      notification.style.animation = "notification-pulse 0.5s ease-in-out 3"
    }

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }, 5000)
  }

  // Enhanced typing animation for hero title
  function typeWriter() {
    const titleElement = document.querySelector(".hero-title .accent-text")
    if (!titleElement) return

    const textToType = ""
    titleElement.innerHTML = "Mohit Singh"
    let i = 0

    function type() {
      if (i < textToType.length) {
        titleElement.innerHTML += textToType.charAt(i)
        i++
        setTimeout(type, 150)
      } else {
        // Add cursor blink effect
        const cursor = document.createElement("span")
        cursor.innerHTML = "|"
        cursor.style.animation = "cursor-blink 1s infinite"
        titleElement.appendChild(cursor)

        setTimeout(() => {
          if (cursor.parentNode) {
            cursor.parentNode.removeChild(cursor)
          }
        }, 3000)
      }
    }

    setTimeout(type, 1500)
  }

  // Initialize enhanced typing animation
  typeWriter()

  // Enhanced parallax effect for hero section
  function parallaxEffect() {
    const hero = document.querySelector(".hero")
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.3

    if (hero && window.innerWidth > 768) {
      hero.style.transform = `translateY(${rate}px)`
    }
  }

  // Enhanced skill chips interactions
  const skillChips = document.querySelectorAll(".neon-chip")
  skillChips.forEach((chip) => {
    chip.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)"
      this.style.boxShadow = "0 0 25px rgba(0, 255, 255, 0.6)"
    })

    chip.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
      this.style.boxShadow = ""
    })

    // Add click effect
    chip.addEventListener("click", function () {
      this.style.animation = "chip-click 0.3s ease"
      setTimeout(() => {
        this.style.animation = ""
      }, 300)
    })
  })

  // Enhanced project cards 3D tilt effect
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      if (window.innerWidth <= 768) return // Disable on mobile

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 8
      const rotateY = (centerX - x) / 8

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
      card.style.boxShadow = "0 20px 40px rgba(0, 255, 255, 0.2)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)"
      card.style.boxShadow = ""
    })
  })

  // Enhanced intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("animate")
        }, index * 100)
      }
    })
  }, observerOptions)

  document.querySelectorAll(".scroll-animate").forEach((el) => {
    observer.observe(el)
  })

  // Enhanced keyboard navigation support
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active")
      const icon = navToggle.querySelector(".material-symbols-outlined")
      icon.textContent = "menu"
      navToggle.style.boxShadow = "none"
    }

    // Add keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "1":
          e.preventDefault()
          scrollToSection("home")
          break
        case "2":
          e.preventDefault()
          scrollToSection("about")
          break
        case "3":
          e.preventDefault()
          scrollToSection("experience")
          break
        case "4":
          e.preventDefault()
          scrollToSection("projects")
          break
        case "5":
          e.preventDefault()
          scrollToSection("skills")
          break
        case "6":
          e.preventDefault()
          scrollToSection("contact")
          break
      }
    }
  })

  // Add parallax effect on scroll (only on larger screens)
  if (window.innerWidth > 768) {
    window.addEventListener("scroll", parallaxEffect)
  }

  // Enhanced mouse trail effect
  const mouseTrail = []
  const maxTrailLength = 20

  document.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 768) return // Disable on mobile

    mouseTrail.push({
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    })

    if (mouseTrail.length > maxTrailLength) {
      mouseTrail.shift()
    }

    updateMouseTrail()
  })

  function updateMouseTrail() {
    const existingTrails = document.querySelectorAll(".mouse-trail")
    existingTrails.forEach((trail) => trail.remove())

    mouseTrail.forEach((point, index) => {
      const trail = document.createElement("div")
      trail.className = "mouse-trail"
      trail.style.cssText = `
                position: fixed;
                left: ${point.x}px;
                top: ${point.y}px;
                width: ${4 + index * 0.5}px;
                height: ${4 + index * 0.5}px;
                background: radial-gradient(circle, var(--neon-cyan), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${index / maxTrailLength};
                transform: translate(-50%, -50%);
                filter: blur(${Math.max(0, 2 - index * 0.1)}px);
            `
      document.body.appendChild(trail)

      setTimeout(() => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail)
        }
      }, 500)
    })
  }

  // Add custom CSS animations
  const style = document.createElement("style")
  style.textContent = `
        @keyframes cursor-blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        @keyframes chip-click {
            0% { transform: translateY(-3px) scale(1.05); }
            50% { transform: translateY(-5px) scale(1.1); }
            100% { transform: translateY(-3px) scale(1.05); }
        }
        
        @keyframes notification-pulse {
            0% { transform: translateX(0) scale(1); }
            50% { transform: translateX(0) scale(1.05); }
            100% { transform: translateX(0) scale(1); }
        }
    `
  document.head.appendChild(style)

  // Performance optimization: Clean up animations on page unload
  window.addEventListener("beforeunload", () => {
    const trails = document.querySelectorAll(".mouse-trail")
    trails.forEach((trail) => trail.remove())
  })

  // Add loading animation completion
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 500)
})

// Enhanced utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const offsetTop = section.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })

    // Add temporary glow effect to target section
    section.style.boxShadow = "0 0 30px rgba(0, 255, 255, 0.3)"
    setTimeout(() => {
      section.style.boxShadow = ""
    }, 2000)
  }
}

// Enhanced performance monitoring
function trackPerformance() {
  if ("performance" in window) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType("navigation")[0]
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart
        console.log(`🚀 Page loaded in ${loadTime}ms`)

        if (loadTime > 3000) {
          console.warn("⚠️ Page load time is slower than optimal")
        }
      }, 0)
    })
  }
}

trackPerformance()

// Add easter egg - Konami code
let konamiCode = []
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
]

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.code)

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift()
  }

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    activateEasterEgg()
    konamiCode = []
  }
})

function activateEasterEgg() {
  // Create rainbow effect
  const style = document.createElement("style")
  style.textContent = `
        .neon-text, .neon-chip, .neon-tag, .neon-feature {
            animation: rainbow-glow 2s ease-in-out infinite !important;
        }
        
        @keyframes rainbow-glow {
            0% { color: var(--neon-cyan); text-shadow: 0 0 20px var(--neon-cyan); }
            16% { color: var(--neon-blue); text-shadow: 0 0 20px var(--neon-blue); }
            32% { color: var(--neon-purple); text-shadow: 0 0 20px var(--neon-purple); }
            48% { color: var(--neon-pink); text-shadow: 0 0 20px var(--neon-pink); }
            64% { color: var(--neon-orange); text-shadow: 0 0 20px var(--neon-orange); }
            80% { color: var(--neon-yellow); text-shadow: 0 0 20px var(--neon-yellow); }
            100% { color: var(--neon-green); text-shadow: 0 0 20px var(--neon-green); }
        }
    `
  document.head.appendChild(style)

  // Show easter egg message
  const message = document.createElement("div")
  message.innerHTML = "🎉 Rainbow Mode Activated! 🌈"
  message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        padding: 20px 40px;
        border-radius: var(--md-sys-shape-corner-large);
        border: 2px solid var(--neon-cyan);
        color: var(--md-sys-color-on-surface);
        font-size: 24px;
        font-weight: 500;
        z-index: 10001;
        animation: rainbow-glow 1s ease-in-out infinite;
    `

  document.body.appendChild(message)

  setTimeout(() => {
    message.remove()
    style.remove()
  }, 5000)
}
