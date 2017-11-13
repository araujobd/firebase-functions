const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/*
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
 */

exports.passageiro = functions.database.ref('users/passageiro/{uid}').onWrite(event => {
  const rootRef = event.data.ref.root;
  const data = event.data.val();

  salvaPassageiro(rootRef, data);
});

function salvaPassageiro(ref, data){
  const id = data.uid;
  salvaNome(ref, id, data.nome);
  salvaFoto(ref, id, data.fotoUrl);
  salvaTelefone(ref, id, data.telefone);
  salvaEndereco(ref, id, data.endereco);
  salvaDescricao(ref, id, data.descricao);
}

function salvaNome(ref, id, nome){
  ref.child('nav/passageiro').child(id).child('nome').set(nome);
  ref.child('perfil/passageiro').child(id).child('nome').set(nome);

}

function salvaFoto(ref, id, foto){
  ref.child('nav/passageiro').child(id).child('fotoUrl').set(foto);
  ref.child('perfil/passageiro').child(id).child('fotoUrl').set(foto);
}

function salvaTelefone(ref, id, tel){
  ref.child('perfil/passageiro').child(id).child('telefone').set(tel);
}

function salvaEndereco(ref, id, end){
  ref.child('perfil/passageiro').child(id).child('endereco').set(end);
}

function salvaDescricao(ref, id, desc){
  ref.child('perfil/passageiro').child(id).child('descricao').set(desc);
}

// Motorista

exports.motorista = functions.database.ref('users/motorista/{uid}').onWrite(event => {
  const rootRef = event.data.ref.root;
  const data = event.data.val();

  salvaMotorista(rootRef, data);
});

function salvaMotorista(ref, data){
  const id = data.uid;
  salvaNomeMot(ref, id, data.nome);
  salvaFotoMot(ref, id, data.fotoUrl);
  salvaTelefoneMot(ref, id, data.telefone);
  salvaEnderecoMot(ref, id, data.endereco);
  salvaDescricaoMot(ref, id, data.descricao);
}

function salvaNomeMot(ref, id, nome){
  ref.child('nav/motorista').child(id).child('nome').set(nome);
  ref.child('perfil/motorista').child(id).child('nome').set(nome);
}

function salvaFotoMot(ref, id, foto){
  ref.child('nav/motorista').child(id).child('fotoUrl').set(foto);
  ref.child('perfil/motorista').child(id).child('fotoUrl').set(foto);
}

function salvaTelefoneMot(ref, id, tel){
  ref.child('perfil/motorista').child(id).child('telefone').set(tel);
}

function salvaEnderecoMot(ref, id, end){
  ref.child('perfil/motorista').child(id).child('endereco').set(end);
}

function salvaDescricaoMot(ref, id, desc){
  ref.child('perfil/motorista').child(id).child('descricao').set(desc);
}

// Viagens
exports.viagem = functions.database.ref('viagens/{uid_via}').onWrite(event => {
  const rootRef = event.data.ref.root;
  const data = event.data.val();

  salvaViagem(rootRef, data);
});

function salvaViagem(ref, data){
	const id = data.uid_via;
	const id_mot = data.uid_mot
	salvaOrigem(ref, id, id_mot, data.origem);
	salvaDestino(ref, id, id_mot, data.destino);
	salvaPreco(ref, id, id_mot, data.preco);
	salvaHora(ref, id, id_mot, data.hora);
}

function salvaOrigem(ref, id, id_mot, origem){
  ref.child('detalhes_viagens_motorista').child(id).child('origem').set(origem);
  ref.child('viagem_motorista').child(id_mot).child(id).child('origem').set(origem);
  ref.child('detalhes_viagens_busca').child(id).child('origem').set(origem);
  ref.child('busca_viagens').child(id).child('origem').set(origem);
}

function salvaDestino(ref, id, id_mot, destino){
  ref.child('detalhes_viagens_motorista').child(id).child('destino').set(destino);
  ref.child('viagem_motorista').child(id_mot).child(id).child('destino').set(destino);
  ref.child('detalhes_viagens_busca').child(id).child('destino').set(destino);
  ref.child('busca_viagens').child(id).child('destino').set(destino);
}

function salvaPreco(ref, id, id_mot, preco){
  ref.child('detalhes_viagens_motorista').child(id).child('preco').set(preco);
  ref.child('viagem_motorista').child(id_mot).child(id).child('preco').set(preco);
  ref.child('detalhes_viagens_busca').child(id).child('preco').set(preco);
  ref.child('busca_viagens').child(id).child('preco').set(preco);
}

function salvaHora(ref, id, id_mot, hora){
  ref.child('detalhes_viagens_motorista').child(id).child('hora').set(hora);
  ref.child('viagem_motorista').child(id_mot).child(id).child('hora').set(hora);
  ref.child('detalhes_viagens_busca').child(id).child('hora').set(hora);
  ref.child('busca_viagens').child(id).child('hora').set(hora);
}


// Carro
exports.carro = functions.database.ref('users/carro/{uid}').onWrite(event => {
  const rootRef = event.data.ref.root;
  const data = event.data.val();

function salvaHora(ref, id, id_mot, hora){
  ref.child('detalhes_viagens_motorista').child(id).child('hora').set(hora);
  ref.child('viagem_motorista').child(id_mot).child(id).child('hora').set(hora);
  ref.child('detalhes_viagens_busca').child(id).child('hora').set(hora);
  ref.child('busca_viagens').child(id).child('hora').set(hora);
}
  salvaCarro(rootRef, data);
});

function salvaCarro(ref, data){
  const id = data.uid;
  const id_mot = data.uid_mot;
  salvaPlaca(ref, id, id_mot, data.placa);
  salvaModelo(ref, id, id_mot, data.modelo);
  salvaCor(ref, id, id_mot, data.cor);
  salvaVagas(ref, id, id_mot, data.vagas);
  salvaVagas_crianca(ref, id, id_mot, data.vagas_crianca);
}

function salvaPlaca(ref, id, placa){
  ref.child('carro').child(id_mot).child(id).child('placa').set(placa);
  ref.child('motorista').child(id_mot).child('carro').child(id).child('placa').set(placa);
}

function salvaModelo(ref, id, modelo){
  ref.child('carro').child(id_mot).child(id).child('modelo').set(modelo);
  ref.child('motorista').child(id_mot).child('carro').child(id).child('modelo').set(modelo);
}

function salvaCor(ref, id, cor){
  ref.child('carro').child(id_mot).child(id).child('cor').set(cor);
  ref.child('motorista').child(id_mot).child('carro').child(id).child('cor').set(cor);
}

function salvaVagas(ref, id, vagas){
  ref.child('carro').child(id_mot).child(id).child('vagas').set(vagas);
  ref.child('motorista').child(id_mot).child('carro').child(id).child('vagas').set(vagas);
}

function salvaVagas_crianca(ref, id, vagas_criaca){
  ref.child('carro').child(id_mot).child(id).child('vagas_crianca').set(vagas_crianca);
  ref.child('motorista').child(id_mot).child('carro').child(id).child('vagas_crianca').set(vagas_crianca);
}

