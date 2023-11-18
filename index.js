import { prompt } from "./prompt.js";

// Création d'un générateur de mot de passe

/* 

node index.js
🔢 Combien de caractères ? (8-36)
10
🔣 Caractères spéciaux ? (y/n)
y
🔢 Chiffres ? (y/n)
y
⬆️ Majuscules ? (y/n)
y
Votre mot de passe généré est : GZC@cbwOTb

*/

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz"
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const SPECIALS = "!@#$%^&*()"
const NUMBERS = "0123456789"

function askPasswordLength() {
        try {
            const passwordLength = Number(prompt("Combien de characteres ? (8-36) : "))
            const length = parseInt(passwordLength, 10)
            if(isNaN(length) || length < 8 || length > 36) {
                throw new Error("Error, you must enter a number between 8 and 36")
            }
            return length
        } catch(error) {
            console.error(error.message)
            askPasswordLength()
        } 
}

function askSpecialCHars() {
        try {
            const specialChars = prompt("Caracteres speciaux ? (y/n) : ")
            if(specialChars.toLowerCase() === "y" || specialChars.toLowerCase()  === "n") {
               return specialChars
            } else {
                throw new Error("Error, you must respond y or n")
            }
        } catch (error) {
            console.error(error.message)
            askSpecialCHars()
        }
}

function askNumbers() {
        try {
            const addNumbers = (prompt("Chiffres ? (y/n) : "))
            if(addNumbers.toLowerCase() === "y" || addNumbers.toLowerCase() === "n") {
                return addNumbers
            }  else {
                throw new Error("Error, you must respond y or n")
            } 
        } catch(error) {
            console.error(error.message)
            askNumbers()
        }
    }


function askUppercase() {
        try {
            const uppercase = prompt("Majuscules ? (y/n) : ")
            if(uppercase.toLowerCase() === "y" || uppercase.toLowerCase() === "n") {
                return uppercase
            } else {
                throw new Error("Error, you must respond y or n")
            }
        } catch (error) {
            console.error(error.message)
            askUppercase()
        }
}


/* Fonction qui gère la randomisation de l'index */
function randomizeIndex(length) {
    return Math.floor(Math.random() * length)
}

/* Fonction générique pour obtenir un index aléatoire */
function randomizeCharacters(value) {
    let randomIndex = randomizeIndex(value.length)
    return value[randomIndex]
}

/* Fonction qui va générer un mot de passe en fonction des prompts de l'utilisateur */
function generateRandomPassWord(length, specialChars, addNumbers, uppercase) {
    let characteres = LOWERCASE

    if (specialChars) {
        characteres += SPECIALS
    }
    if (addNumbers) {
        characteres += NUMBERS
    }
    if (uppercase) {
        characteres += UPPERCASE
    }

    let password = '';
    while (password.length < length) {
        password += randomizeCharacters(characteres);
    }

    if(uppercase && password.toLowerCase() === password) {
        return generateRandomPassWord(length, specialChars, addNumbers, uppercase)
    }

    return password;
}


/* Fonction qui va regrouper toutes les fonctions */
function main() {
    let responses = {}
    
    while(true) {
        responses.length = askPasswordLength();
        responses.specialChars = askSpecialCHars();
        responses.addNumbers = askNumbers()
        responses.uppercase = askUppercase()

       
        console.log("Tout les prompts sont complétés. Nous allons générer votre mot de passe sous peu, merci de patienter ...")
        
        const password = generateRandomPassWord( responses.length,  responses.specialChars, responses.addNumbers, responses.uppercase)
        
        console.log("Votre mot de passe est : ", password)
        break;
    }
}

console.log(main())