export interface IDocument {
  content: IContent[];
}

export interface IContent {
  type: string;
  attrs?: IAttr;
  content: {
    type: string;
    attrs: IAttr;
    content: {
      type?: string;
      marks?: any[];
      text?: string;
    }[];
  }[];
}

export interface IAttr {
  bold?: boolean;
  alignment?: string;
  blockCSS?: {
    textAlign?: string;
  };
  font?: string;
  italic?: boolean;
  textCSS?: {
    fontFamily: string;
    fontStyle?: string;
    fontWeight?: string;
    textDecoration?: string;
    textDecorationStyle?: string;
  };
}
