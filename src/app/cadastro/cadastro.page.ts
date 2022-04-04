import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contato } from '../models/Contato';
import { StorageService } from '../services/storage.service';
import { ProfilePhotoOptionComponent } from '../../components/contato-photo/contato-photo';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem'
import { ModalController, Platform } from '@ionic/angular';
import { ValidationService } from '../services/validation.service';

const IMAGE_DIR = 'stored-images'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  photo:any = 'photo'
  photoPreview = 'https://i.pravatar.cc/150'

  formCadastro: FormGroup
  contato: Contato = new Contato()

  mensagens = {
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

  constructor(
    private _platform: Platform,
    private _modalController: ModalController,
    private _formBuilder: FormBuilder,
    private _storageService: StorageService,
    private _route: Router

    ) {
        this.formCadastro = this._formBuilder.group({
        nome: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(3)])],
        sobreNome: ['', Validators.compose([Validators.maxLength(22),Validators.minLength(3)])],
        email: ['', Validators.email],
        telefone: ['', Validators.compose([Validators.required, ValidationService.phoneValidator])],
        anotacao: ['',  Validators.compose([Validators.maxLength(150),Validators.minLength(3)])]
    })
   }

  ngOnInit() {
  }

  async openOptionSelection() {
    const modal = await this._modalController.create({
      component: ProfilePhotoOptionComponent,
      cssClass: 'transparent-modal'
    })
    modal.onDidDismiss()
    .then(res => {

      if (res.role !== 'backdrop') {
        this.takePicture(res.data);
      }
    });
    return await modal.present();
  }

  async takePicture(type) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource[type],
    });

      this.photo = image

      this.photoPreview = image.webPath

  }
 gerarId(len) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < len; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
 charactersLength));
   }
   return result;
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

  async addContato(){
     const base64Data = await this.readAsBase64(this.photo)
     const fileName = new Date().getTime() + '.jpeg'
     const savedFile = await Filesystem.writeFile({
     directory: Directory.Data,
     path:`${IMAGE_DIR}/${fileName}`,
     data:base64Data
     })

    if(this.formCadastro.valid){
      this.contato.id = this.gerarId(4)
      this.contato.photo = base64Data
      this.contato.nome = this.formCadastro.value.nome
      this.contato.sobreNome = this.formCadastro.value.sobreNome
      this.contato.email = this.formCadastro.value.email
      this.contato.telefone = this.formCadastro.value.telefone
      this.contato.anotacao = this.formCadastro.value.anotacao
      await this._storageService.addContato(this.contato.id, this.contato)

      this._route.navigateByUrl('/home')
    }
  }

}
