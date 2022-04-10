import { Component } from "@angular/core";
import { Contato } from "../models/Contato";
import { StorageService } from "../services/storage.service";


@Component({
  selector: "home.page",
  templateUrl: "./home.page.html",
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  public static readonly pageName = "HomePage";

  descending: boolean = false;
  order: number;
  column: string = 'nome';
  contato: Contato[] = []
  queryText: string

  constructor(
    private _storageService: StorageService

  ) {this.listarContatos()}

  async listarContatos(){
    this.contato = await this._storageService.getAllContatos()
  }

  ionViewDidEnter(){
    this.listarContatos()
  }

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }





}
