const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.test = functions.database.ref('nav/passageiro/{uid}/nome').onWrite(event => {
  const rootRef = event.data.ref.root;
  const old = event.data.val();
  const upper = passaNome(rootRef, old);

  event.data.ref.root.child('too').set(upper);
  return event.data.ref.parent.child('test').set(upper);
});

function passaNome(ref, nome) {
  ref.child('too2').set(nome.toUpperCase());

  return nome.toUpperCase();
}
