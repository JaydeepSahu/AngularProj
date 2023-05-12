export interface Movie {
    BasicPrice:number;
    MovieName:string;
    Rows:{
        row:number;
        Start:number;
        End:number;
        AlreadyBooked:number[];
    }[]
}
