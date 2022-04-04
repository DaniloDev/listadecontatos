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

  async getAll(){
    let listaContatos = []
    let keysToSearch = []
    let listKeys = []
    let keys = await Storage.keys()
    listKeys.push(keys)
    listKeys.forEach( list =>{
      keysToSearch.push(list)
    })

    for(let i = 0; i <  keysToSearch[0].keys.length; i++){

      let key = keysToSearch[0].keys[i]
      const contatos  = await Storage.get({key: key})
      listaContatos.push(JSON.parse(contatos.value))
    }
    return listaContatos

  }
}

