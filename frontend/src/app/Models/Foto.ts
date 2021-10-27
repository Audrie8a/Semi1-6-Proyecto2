export class Foto {

    imagen1:string;
    imagen2:string;
    extension:string;
    similitud: string;


    constructor(imagen1: string, imagen2: string, extension: string, similitud:string) {
        this.imagen1=imagen1;
        this.imagen2=imagen2;
        this.extension=extension;
        this.similitud=similitud;
    }
}