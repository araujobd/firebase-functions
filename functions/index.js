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

exports.motorista = functions.database.ref('users/motoristas/{uid}').onWrite(event => {
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
exports.viagem = functions.database.ref('viagens/{uid}').onWrite(event => {
  const rootRef = event.data.ref.root;
  const data = event.data.val();

  salvaViagem(rootRef, data);
});

function salvaViagem(ref, data){
  const id = data.uid;
  const id_mot = data.uid_mot

  salvaOrigem(ref, id, id_mot, data.origem);
  salvaDestino(ref, id, id_mot, data.destino);
  salvaPreco(ref, id, id_mot, data.preco);
  salvaHora(ref, id, id_mot, data.horario);
  salvaData(ref, id, id_mot, data.data);
  salvaOrigemDestino(ref, id, id_mot, data.origem, data.destino);
  salvaUidViagem(ref,id,id_mot);
  salvaVagasViagem(ref,id,id_mot, data.qtd_vagas)
}

function salvaVagasViagem(ref, id, id_mot, vagas){
  ref.child('busca_viagens').child(id).child('qtd_vagas').set(vagas);
  ref.child('detalhes_viagens_busca').child(id).child('qtd_vagas').set(vagas);
  ref.child('detalhes_viagens_motorista').child(id).child('qtd_vagas').set(vagas);
  ref.child('viagem_motorista').child(id_mot).child(id).child('qtd_vagas').set(vagas);
}

function salvaUidViagem(ref, id, id_mot){
  ref.child('busca_viagens').child(id).child('uid').set(id);
  ref.child('detalhes_viagens_busca').child(id).child('uid').set(id);
  ref.child('detalhes_viagens_motorista').child(id).child('uid').set(id);
  ref.child('viagem_motorista').child(id_mot).child(id).child('uid').set(id);
}

function salvaOrigemDestino(ref, id, id_mot, origem, destino){
  ref.child('busca_viagens').child(id).child('origemdestino').set(origem+destino);
}

function salvaOrigem(ref, id, id_mot, origem){
  ref.child('detalhes_viagens_busca').child(id).child('origem').set(origem);
  ref.child('busca_viagens').child(id).child('origem').set(origem);
  ref.child('detalhes_viagens_motorista').child(id).child('origem').set(origem);
  ref.child('viagem_motorista').child(id_mot).child(id).child('origem').set(origem);
}

function salvaDestino(ref, id, id_mot, destino){
  ref.child('detalhes_viagens_busca').child(id).child('destino').set(destino);
  ref.child('busca_viagens').child(id).child('destino').set(destino);
  ref.child('detalhes_viagens_motorista').child(id).child('destino').set(destino);
  ref.child('viagem_motorista').child(id_mot).child(id).child('destino').set(destino);
}

function salvaPreco(ref, id, id_mot, preco){
  ref.child('detalhes_viagens_busca').child(id).child('preco').set(preco);
  ref.child('busca_viagens').child(id).child('preco').set(preco);
  ref.child('detalhes_viagens_motorista').child(id).child('preco').set(preco);
  ref.child('viagem_motorista').child(id_mot).child(id).child('preco').set(preco);
}

function salvaHora(ref, id, id_mot, hora){
  ref.child('detalhes_viagens_busca').child(id).child('horario').set(hora);
  ref.child('busca_viagens').child(id).child('horario').set(hora);
  ref.child('detalhes_viagens_motorista').child(id).child('horario').set(hora);
  ref.child('viagem_motorista').child(id_mot).child(id).child('horario').set(hora);
}
function salvaData(ref, id, id_mot, data){
  ref.child('detalhes_viagens_busca').child(id).child('data').set(data);
  ref.child('busca_viagens').child(id).child('data').set(data);
  ref.child('detalhes_viagens_motorista').child(id).child('data').set(data);
  ref.child('viagem_motorista').child(id_mot).child(id).child('data').set(data);
}


// Carro
/*exports.carro = functions.database.ref('users/motoristas/{uid}/carro').onWrite(event => {
  const rootRef = event.data.ref.root;
  const data = event.data.val();

  salvaCarro(rootRef, data);
});

function salvaCarro(ref, data){
  const id = data.uid;
  salvaVagas(ref, id, data.vagas);
}

function salvaVagas(ref, id, vagas){
  ref.child('viagens').child(id).child('qtd_vagas').set(vagas);
}*/



// Reserva
exports.reserva = functions.database.ref('viagens/{uid}/passageiros/{uid_pas}').onWrite(event => {
  const rootRef = event.data.ref.root;
  const nodeParent = event.data.ref.parent.parent;
  const data = event.data.val();

  realizarReserva(rootRef, data, nodeParent);
});

function realizarReserva(rootRef, data, nodeParent){
	const id_pas = data.uid;
	var viagem;
	var motorista;

	var ouvinte = function ouvinte(snap){
			viagem = snap.val();
			salvaOrigemRes(rootRef,id_pas,viagem.uid,viagem.origem);
			salvaDestinoRes(rootRef,id_pas,viagem.uid,viagem.destino);
			salvaPrecoRes(rootRef,id_pas,viagem.uid,viagem.preco);
			salvaDataRes(rootRef,id_pas,viagem.uid,viagem.data);
			salvaHoraRes(rootRef,id_pas,viagem.uid,viagem.horario);
			salvaUidViaRes(rootRef,id_pas,viagem.uid);
	}	
	nodeParent.once('value', ouvinte);
	
	var motOuvinte = function motOuvinte(snap){
			motorista = snap.val();
			salvaUidMotRes(rootRef,id_pas,viagem.uid,motorista);
	}
	rootRef.child('users/motoristas').child(viagem.uid_mot).once('value', motOuvinte);
	
	rootRef.child("viagens").child(viagem.uid).child("passageiros").child(id_pas).child("reservado").set(true)
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
	ref.child('viagens_passageiro_principal').child(id_pas).child(id_via).child('horario').set(hora);
}
function salvaUidViaRes(ref, id_pas, id_via){
	ref.child('viagens_passageiro_principal').child(id_pas).child(id_via).child('uid').set(id_via);
}
function salvaUidMotRes(ref, id_pas, id_via, mot){
	ref.child('viagens_passageiro_principal').child(id_pas).child(id_via).child('uid_mot').set(mot.uid);
}

//Remover
/*exports.remover = functions.database.ref('viagem_motorista/{uid_mot}/{uid}').onDelete(event => {
  const rootRef = event.data.ref.root;
  const data = event.data.previous.val();

  remover(rootRef, data);
});

function remover(rootRef, data){
	const id = data.uid;
	removeViagem(rootRef,id);

}

function removeViagem(ref, id){
	ref.child('viagens').removeChild(id);
}*/