export class Util {


  static gerarId(len) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < len; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
 charactersLength));
   }
   return result;
}
/**
 Requisitos para cadastrar novo contato
 */

static reqNovoContato() {
        return  {
            nome: [
              { tipo: 'required', mensagem: 'O campo nome é obrigatório'},
              { tipo: 'minlength', mensagem: 'O campo nome é deve ter pelo menos 3 caracteres'},
              { tipo: 'maxlength', mensagem: 'O campo nome é deve ter no máximo 10 caracteres'}
            ],
            sobreNome: [
              { tipo: 'minlength', mensagem: 'O campo nome é deve ter pelo menos 3 caracteres'},
              { tipo: 'maxlength', mensagem: 'O campo nome é deve ter no máximo 22 caracteres'}
            ],
            email: [
              { tipo: 'email', mensagem: 'Email Inválido'}
            ],
            telefone: [
              { tipo: 'required', mensagem: 'O campo telefone é obrigatório'},
              { tipo: 'maxlength', mensagem: 'O campo nome é deve ter no máximo 15 caracteres'},
              { tipo: 'invalidPhone', mensagem: 'Informe um número de telefone válido!'}

            ],
            anotacao: [
              { tipo: 'minlength', mensagem: 'O campo nome é deve ter pelo menos 3 caracteres'},
              { tipo: 'maxlength', mensagem: 'O campo nome é deve ter no máximo 150 caracteres'}
            ],
          }


  }


}


