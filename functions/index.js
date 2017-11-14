const functions = require('firebase-functions');
const passageiroS = require('./passageiro')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.passageiro = functions.database.ref('users/passageiro/{uid}').onWrite(event => {
  const rootRef = event.data.ref.root;
  const data = event.data.val();

  salvaPassageiro(rootRef, data);
});

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


// Reserva
exports.reserva = functions.database.ref('viagens/{uid_via}/passageiros/{uid_pas}').onWrite(event => {
  const rootRef = event.data.ref.root;
  const nodeParent = event.data.ref.parent.parent;
  const data = event.data.val();

  realizarReserva(rootRef, data, nodeParent);
});

function realizarReserva(rootRef, data, nodeParent){
	const id_pas = data.uid_pas;
	const id_via = nodeParent.uid_via;
	const id_mot = nodeParent.uid_mot;

	salvaOrigemRes(rootRef,id_pas,id_via,nodeParent.origem);
	salvaDestinoRes(rootRef,id_pas,id_via,nodeParent.destino);
	salvaPrecoRes(rootRef,id_pas,id_via,nodeParent.preco);
	salvaDataRes(rootRef,id_pas,id_via,nodeParent.data);
	salvaHoraRes(rootRef,id_pas,id_via,nodeParent.hora);
	salvaUidMotRes(rootRef,id_pas,id_via,id_mot.uid);
	salvaNomeMotRes(rootRef,id_pas,id_via,id_mot.nome);
	salvaFotoMotRes(rootRef,id_pas,id_via,id_mot.fotoUrl);
}

function salvaOrigemRes(ref, id_pas, id_via, origem){
	ref.child('viagens_passageiro_principal').child(id_pas).child(id_via).child('origem').set(origem);
}
function salvaDestinoRes(ref, id_pas, id_via, destino){
	ref.child('viagens_passageiro_principal').child(id_pas).child(id_via).child('destino').set(destino);
}
function salvaPrecoRes(ref, id_pas, id_via, preco){
	ref.child('viagens_passageiro_principal').child(id_pas).child(id_via).child('preco').set(preco);
}
function salvaDataRes(ref, id_pas, id_via, data){
	ref.child('viagens_passageiro_principal').child(id_pas).child(id_via).child('data').set(data);
}
function salvaHoraRes(ref, id_pas, id_via, hora){
	ref.child('viagens_passageiro_principal').child(id_pas).child(id_via).child('hora').set(hora);
}
function salvaUidMotRes(ref, id_pas, id_via, id_mot){
	ref.child('viagens_passageiro_principal').child(id_pas).child(id_via).child('motorista').child('uid').set(id_mot);
}
function salvaNomeMotRes(ref, id_pas, id_via, nome){
	ref.child('viagens_passageiro_principal').child(id_pas).child(id_via).child('motorista').child('nome').set(nome);
}
function salvaFotoMotRes(ref, id_pas, id_via, foto){
	ref.child('viagens_passageiro_principal').child(id_pas).child(id_via).child('motorista').child('fotoUrl').set(foto);
}