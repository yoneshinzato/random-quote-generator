const quoteContainer = document.querySelector("#quote-container")
const quoteText = document.querySelector("#quote")
const authorText = document.querySelector("#author")
const twitterBtn = document.querySelector("#twitter")
const newQuoteBtn = document.querySelector("#new-quote")
const loader = document.querySelector("#loader")

let apiQuotes = []

//show loading
function loading() {
    loader.hidden = false
    quoteContainer.hidden = true
}

//hide loading
function complete() {
    quoteContainer.hidden = false
    loader.hidden = true
}

//show new quote
function newQuote(){
    loading()
    //pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
   //check if author field is blank and replace with 'unknown'
   if(!quote.author){
       authorText.textContent = "Unknown"
   } else {
       authorText.textContent = quote.author
   }
   //check quote length to determine the styling
   if(quote.text.length > 90){
       quoteText.classList.add("long-quote")
   } else {
    quoteText.classList.remove("long-quote")
   }
   //set quote, hide loader
    quoteText.textContent = quote.text
    complete()
}

//get quote from aPI
async function getQuotes(){
    loading()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    } catch(error) {
        //alert(error)
        //catch error here

    }
}

//tweet quote
function tweetQuote() {
    const twitterUrl = `https://www.twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

//event listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

//on load
getQuotes()