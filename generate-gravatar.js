
/**
 * Generates a Gravatar URL based on the provided email and size.
 * @param {string} email - The email address to generate the Gravatar URL for.
 * @param {number} [size=80] - The optional size parameter for the Gravatar image.
 * @returns {string} The generated Gravatar URL.
 */
import CryptoJS from "crypto-js"


const email = 'your-email@example.com'
const size = 200 // Optional size parameter
const gravatarUrl = getGravatarUrl(email, size)

console.log('Gravatar URL:', gravatarUrl)

function getGravatarUrl(email, size = 80) {
    const trimmedEmail = email.trim().toLowerCase()
    const hash = CryptoJS.SHA256(trimmedEmail).toString(CryptoJS.enc.Hex)
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`
}
