import { MatButtonModule, MatCheckboxModule, MatIconModule, MatTableModule, MatSortModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatToolbarModule, MatMenuModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatTableModule, MatSortModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatToolbarModule, MatMenuModule, MatProgressSpinnerModule, MatCardModule],
    exports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatTableModule, MatSortModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatToolbarModule, MatMenuModule, MatProgressSpinnerModule, MatCardModule]
})
export class MaterialModule { }