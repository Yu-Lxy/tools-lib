
export interface TextElement {
    id: string;
    type: 'text';
    content: string;
    fontSize: number;
    color: string;
    x: number;
    y: number;
    fontFamily: string;
    fontWeight: string;
    zIndex?: number;
  }
  
  export interface ImageElement {
    id: string;
    type: 'image';
    src: string;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex?: number;
  }
  
  export type PosterElement = TextElement | ImageElement;
  
  export interface PosterConfig {
    width: number;
    height: number;
    backgroundColor: string;
    elements: PosterElement[];
  }