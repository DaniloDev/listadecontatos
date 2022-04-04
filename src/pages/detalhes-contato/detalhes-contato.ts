import { Component, Input } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";


@Component({
  selector: "detalhes-contato",
  templateUrl: "./detalhes-contato.html",
  styleUrls: ['./detalhes-contato.scss'],
})

export class DetalhesContatoPage {
  @Input()
  cont;


  public imgLoaded: boolean = false;
  constructor(
    private _navParams: NavParams,
    private _modalCtrl: ModalController,

  ) {

    this.cont = this._navParams.get("cont");
  }

   closeModal(){
    this._modalCtrl.dismiss(DetalhesContatoPage)
   }


}



