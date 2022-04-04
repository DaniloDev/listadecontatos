import { Component, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { StorageService } from "src/app/services/storage.service";
import { DetalhesContatoPage } from "../../pages/detalhes-contato/detalhes-contato";

@Component({
  selector: "contato-card",
  templateUrl: "./contato-card.html",
  styleUrls: ['./contato-card.scss'],
})
export class ContatoCardComponent {
  @Input()
  contato

  constructor(
    private  _modalCtrl: ModalController,
    private _storageService: StorageService,
    ) { }

  async openContato() {
    const modal = await this._modalCtrl.create({
      component: DetalhesContatoPage,
      componentProps: {
        cont: this.contato
      }
    });
    return await modal.present();
  }

  async listarContatos(){
    this.contato = await this._storageService.getAll()
  }

  async DeleteContato(id: string){
    await this._storageService.deleteContato(id)
    window.location.reload();
  }

}
