const quoteContainer = document.getElementById('quote-container')
const quotetext = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

// Show Loading
function showLoadingSpinner() {
    loader.hidden = false
    quoteContainer.hidden = true
}

// Hide Loading
function removeLoadingSpinner() {
    loader.hidden = true
    quoteContainer.hidden = false
}

let apiQuotes = []

// Show New Quote
function newQuote() {
    showLoadingSpinner()
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // Check if Author field is black and replace it with "Unknown"
    quote.author ? authorText.textContent = quote.author : authorText.textContent = 'Unknown'

    quote.text.length > 80 ? quotetext.classList.add('long-quote') : quotetext.classList.remove('long-quote')

    quotetext.textContent = quote.text
    removeLoadingSpinner()
}

// Get Quotes From API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    } catch (error) {
        getQuotes()
        // Catch Error Here
    }
}


// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quotetext.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)


// On Load
showLoadingSpinner()
getQuotes()