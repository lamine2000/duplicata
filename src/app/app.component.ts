import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Step2DialogComponent} from "./step2-dialog/step2-dialog.component";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'duplicata';
  duplicata_types: string[] = ['Certificat d\'inscription', 'Relevé de notes', 'Carte d\'étudiant', 'Attestation de passage', 'Attestation de réussite'];
  duplicata_prices: number[] = [5000, 5000, 10000, 5000, 10000];
  duplicata_commission: number[] = [250, 250, 500, 250, 500]
  chosen_count: number[] = [0, 0, 0, 0, 0];

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialog: MatDialog,
    private snackbar: MatSnackBar){}

  addOne(index: number) : void{
    this.chosen_count[index] += 1;
  }

  removeOne(index: number) : void{
    const n = this.chosen_count[index];
    this.chosen_count[index] = n > 0 ? n-1 : n;
  }

  toPay() : number{
    let sum = 0;
    for(let i = 0; i < this.chosen_count.length; i++)
      sum += this.chosen_count[i] * this.duplicata_prices[i];
    return sum;
  }

  toPayCommission(): number{
    let sum = 0;
    for(let i = 0; i < this.chosen_count.length; i++)
      sum += this.chosen_count[i] * this.duplicata_commission[i];
    return sum;
  }

  submit(): void{
    const dialogRef = this.dialog.open(Step2DialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.chosen_count = [0, 0, 0, 0, 0];
      setTimeout(() =>
      {
        this.openSnackbar("Vérification des données effectuée");
        setTimeout(() =>
        {
          this.openSnackbar("Paiement effectué");
          setTimeout(() =>
          {
            this.openSnackbar("Un accusé de réception vous a été envoyé par mail.Votre demande sera traitée sous 48h");
          }, 2000);
        },
          2000);
        },
        2000);
    });
  }

  openSnackbar(msg: string): void{
    this.snackbar.open(msg, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
