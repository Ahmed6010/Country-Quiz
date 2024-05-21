
const randomNumber = (data) => {
  let min = 0
  let max = data.length - 1
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomCountry = (data, maxNameLength = 22) => {
  let country
  
  // Select a country with a name length within the acceptable range
  do {
    country = data[randomNumber(data)]
  } while (country && country.name.common.length > maxNameLength)
  
  return country  
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

const question1 = (data) => {
  const elements = []
  const country = randomCountry(data)

  while (elements.length < 3) {
    let option = randomCountry(data)
    
    if (country.name.common !== option.name.common && !elements.includes(option.name.common)) {
      elements.push(option.name.common)
    }
  }

  return {
    question : `Which country is ${country.capital} the capital ?`,
    options : shuffleArray([country.name.common, ...elements]),
    answer : country.name.common,
  }
}

const question2 = (data) => {
  const elements = []
  const country = randomCountry(data)

  while (elements.length < 3) {
    let option = randomCountry(data)

    if (country.capital !== option.capital && !elements.includes(option.capital)) {
      elements.push(option.capital)
    }
  }

  return {
    question : `What is the capital of ${country.name.common} ?`,
    options : shuffleArray([country.capital, ...elements]),
    answer : country.capital,
  }
}

const question3 = (data) => {
  const elements = []
  const country = randomCountry(data)
  const uniqueContinents = [...new Set(data.map(country => country.continents[0]))]

  while (elements.length < 3) {
    const randomContinent = uniqueContinents[randomNumber(uniqueContinents)]
    if (!elements.includes(randomContinent) && randomContinent !== country.continents[0]) {
      elements.push(randomContinent)
    }
  }
 
  return {
    question : `In which continent is ${country.name.common} located ?`,
    options : shuffleArray([country.continents[0], ...elements]),
    answer : country.continents[0],
  }
}

const question4 = (data) => {
  const elements = []
  const country = randomCountry(data)
  const neighbors = Array.isArray(country.borders) ? country.borders.length : 0

  while (elements.length < 3) {
    let option = randomCountry(data)

    if (!option.borders) {
      continue
    }

    if (neighbors !== option.borders.length && !elements.includes(option.borders.length)) {
      elements.push(option.borders.length)
    }
  }

  return {
    question : `How many neighbors does ${country.name.common} have ?`,
    options : shuffleArray([neighbors, ...elements]),
    answer : neighbors,
  }
}

const question5 = (data) => {
  const elements = []
  const country = randomCountry(data)

  while (elements.length < 3) {
    let option = randomCountry(data)
    
    if (country.name.common !== option.name.common && !elements.includes(option.name.common)) {
      elements.push(option.name.common)
    }
  }

  return {
    question : `which country does this flag ${country.flag} belong to ?`,
    options : shuffleArray([country.name.common, ...elements]),
    answer : country.name.common,
  }
}

const question6 = (data) => {
  const elements = []
  const country = randomCountry(data)
  const languages = Object.values(country.languages)

  while (elements.length < 3) {
    let option = randomCountry(data)
    let optionLanguage = Object.values(option.languages)[0]
    
    if (!languages.includes(optionLanguage) && !elements.includes(optionLanguage)) {
      elements.push(optionLanguage)
    }
  }

  return {
    question : `What language is spoken in ${country.name.common} ?`,
    options : shuffleArray([languages[0], ...elements]),
    answer : languages[0],
  }
}

const question7 = (data) => {
  const elements = []
  const country = randomCountry(data)
  const languages = Object.values(country.languages).length

  while (elements.length < 3) {
    let option = randomCountry(data)
    let optionLanguage = Object.values(option.languages).length
    
    if (languages !== optionLanguage && !elements.includes(optionLanguage)) {
      elements.push(optionLanguage)
    }
  }

  return { 
    question : `How many languages are officially spoken in ${country.name.common} ?`,
    options : shuffleArray([languages, ...elements]),
    answer : languages,
  }
}

const question8 = (data) => {
  const elements = []
  const country = randomCountry(data)

  while (elements.length < 3) {
    let option = randomCountry(data)
    
    if (country.flag !== option.flag && !elements.includes(option.flag)) {
      elements.push(option.flag)
    }
  }

  return {
    question : `Which flag belongs to ${country.name.common} ?`,
    options : shuffleArray([country.flag, ...elements]),
    answer : country.flag,
  }
}

const generateQuize = (data) => {
  const questions = []
  questions.push(question1(data))
  questions.push(question2(data))
  questions.push(question3(data))
  questions.push(question4(data))
  questions.push(question5(data))
  questions.push(question6(data))
  questions.push(question7(data))
  questions.push(question8(data))
  
  // .sort(() => Math.random() - 0.5
  return questions
}

export { generateQuize }