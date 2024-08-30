import { Routes } from '@angular/router';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/vehiclelist",
        pathMatch: "full"
    },
    {
        path: "vehiclelist",
        children: [
            { path: "",component: VehicleListComponent },
            { path: ":id", component: VehicleDetailComponent },
        ],
    },
];
