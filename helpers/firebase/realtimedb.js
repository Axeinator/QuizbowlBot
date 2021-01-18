const { dbSetup } = require('./firebaseSetup')
const firebase = require('firebase')

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

db = dbSetup()

async function randomTossup() {
  let tossup = await db.ref(`/tossups/${getRandomInt(1, 99)}`).once('value')
  return [tossup.val().text, tossup.val().answer]
}

module.exports = { randomTossup }