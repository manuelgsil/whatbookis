export interface Author {
    nombre: string;    
    nacimiento: number | null; 
    fallecimiento: number | null; 
}

export interface Book {
    idProyectoGutenberg: number; 
    titulo: string;               
    tituloEs: string | null;      
    cantidadDescargas: number;    
    enlace: string;               
    temas: string[];             
    primerParrafoEn: string | null;  
    primerParrafoEs: string | null;   
    autores: Author[];            
}
