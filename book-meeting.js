// Configuration for Telegram Bot
// Replace these with your actual bot token and chat ID when provided
let BOT_TOKEN = "YOUR_BOT_TOKEN"
let CHAT_ID = "YOUR_CHAT_ID"

// Form submission handler
document.addEventListener("DOMContentLoaded", () => {
  const meetingForm = document.getElementById("meetingForm")
  const formStatus = document.getElementById("formStatus")
  const submitBtn = document.getElementById("submitBtn")

  if (meetingForm) {
    meetingForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Show loading status
      formStatus.textContent = "Sending your request..."
      formStatus.className = "form-status loading"
      submitBtn.disabled = true

      // Get form data
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const phone = document.getElementById("phone").value || "Not provided"
      const description = document.getElementById("description").value

      // Format message for Telegram
      const message = `
📅 *NEW MEETING REQUEST* 📅

👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *Phone:* ${phone}
📝 *Description:* ${description}

🕒 Requested on: ${new Date().toLocaleString()}
      `

      // Send to Telegram
      sendToTelegram(message)
        .then((response) => {
          if (response.ok) {
            // Success
            formStatus.textContent = "Meeting request sent successfully! I'll get back to you soon."
            formStatus.className = "form-status success"
            meetingForm.reset()
          } else {
            // Error from Telegram API
            throw new Error("Failed to send message to Telegram")
          }
        })
        .catch((error) => {
          console.error("Error:", error)
          formStatus.textContent =
            "There was an error sending your request. Please try again or contact me directly via Telegram."
          formStatus.className = "form-status error"
        })
        .finally(() => {
          submitBtn.disabled = false
        })
    })
  }
})

// Function to send message to Telegram
async function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`

  const params = {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: "Markdown",
  }

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
}

// Function to update bot configuration
function updateBotConfig(token, chatId) {
  BOT_TOKEN = token
  CHAT_ID = chatId
  console.log("Bot configuration updated")
}

// You can call this function to update the bot token and chat ID
// Example: updateBotConfig("1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ", "123456789");
