import { Routes } from '@angular/router';
import { ByCapital, ByCountry, ByRegion, SeeCountry } from './country';

export const routes: Routes = [
    {
        path: '',
        component: ByCountry,
        pathMatch: 'full'
    },
    {
        path: 'region',
        component: ByRegion,
    },
    {
        path: 'capital',
        component: ByCapital
    },
    {
        path: 'country/:id',
        component: SeeCountry
    },
    {
        path: '**',
        redirectTo: ''
    }
];
