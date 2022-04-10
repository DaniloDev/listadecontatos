import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  async addContato(key, value: any){
    await Storage.set({
      key: key,
      value: JSON.stringify(value)
    })
  }

  async deleteContato(key: string){
    await Storage.remove({
      key: key,
    })
  }

  async getAllContatos(){
    let listaContatos = []
    let keysToSearch = []
    keysToSearch.push(await Storage.keys())

    for(let i = 0; i <  keysToSearch[0].keys.length; i++){
      let key = keysToSearch[0].keys[i]
      let contato  = await Storage.get({key: key})
      listaContatos.push(JSON.parse(contato.value))
    }

    return listaContatos

  }
}

