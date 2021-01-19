const quoteContainer = document.querySelector("#quote-container")
const quoteText = document.querySelector("#quote")
const authorText = document.querySelector("#author")
const twitterBtn = document.querySelector("#twitter")
const newQuoteBtn = document.querySelector("#new-quote")


let apiQuotes = []

//show new quote
function newQuote(){
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
    quoteText.textContent = quote.text
}

//get quote from aPI
async function getQuotes(){
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


getQuotes()