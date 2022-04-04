import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ContatoCardComponent } from '../../components/contato-card/contato-card';
import { DetalhesContatoPage } from '../../pages/detalhes-contato//detalhes-contato';

import { HomePageRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { SortPipe } from '../sort.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    Ng2SearchPipeModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage,  ContatoCardComponent, DetalhesContatoPage, SortPipe],

})
export class HomePageModule {}
