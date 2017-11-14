
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
