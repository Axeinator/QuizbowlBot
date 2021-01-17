const { dbSetup } = require('./firebaseSetup')
const firebase = require('firebase')

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

db = dbSetup()

function randomTossup() {
  db.ref(`/tossups/${getRandomInt(1, 99)}`).once('value')
    .then(snapshot => console.log(snapshot.val()))
}