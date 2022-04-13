import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contato } from '../models/Contato';
import { StorageService } from '../services/storage.service';
import { ProfilePhotoOptionComponent } from '../../components/contato-photo/contato-photo';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem'
import { ModalController, Platform } from '@ionic/angular';
import { ValidationService } from '../services/validation.service';
import { Util } from 'src/utils/functions';

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

  mensagens = Util.reqNovoContato()

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

  async takePicture(type: any) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource[type],
    });

      this.photo = image

      this.photoPreview = image.webPath

  }

  async addContato(){
     let util = new Util(this._platform)
     const base64Data = await util.readAsBase64(this.photo)

     const fileName = new Date().getTime() + '.jpeg'
     const savedFile = await Filesystem.writeFile({
     directory: Directory.Data,
     path:`${IMAGE_DIR}/${fileName}`,
     data:base64Data
     })

    if(this.formCadastro.valid){
      this.contato.id = Util.gerarId(4)
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
