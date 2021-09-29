import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {WebcamImage} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';

export interface DialogData {
  Archivo: string
}


@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.css']
})
export class CamaraComponent implements OnInit {

    private trigger: Subject<void> = new Subject<void>();
    public webcamImage: WebcamImage | undefined;

    triggerSnapshot(): void {
      this.trigger.next();
     }

    handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.data.Archivo=String(this.webcamImage.imageAsDataUrl);
   }

   public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
   }

  constructor(public dialogRef: MatDialogRef<CamaraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
