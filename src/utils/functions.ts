import { Photo } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem'
import { Platform } from '@ionic/angular';

export class Util {


  constructor(private _platform: Platform){}

  /**
   Gera Id com numero de caracteres entre numeros e letras que passar pra ele
 */
  static gerarId(len: any) {
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
static reqNovoContato(): any {
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


async readAsBase64(photo: Photo){
    if(this._platform.is('hybrid')){
      const file = await Filesystem.readFile({
        path: photo.path
      })
      return file.data
    }
    else {
      const response = await fetch(photo.webPath)
      const blob = await response.blob()

      return await this.convertBlobToBase64(blob) as string
    }
  }


 convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader
    reader.onerror = reject
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(blob)
  })


}


