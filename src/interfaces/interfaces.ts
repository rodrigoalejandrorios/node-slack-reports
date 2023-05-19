import { LIST_COLOR } from "../constant";

export type TextType = "NORMAL" | "CODE_BLOCK";

export interface Data {
  color: keyof typeof LIST_COLOR;
  title: string;
  description?: {
    type: TextType;
    data: string;
  };
}



export interface GlobalData {
  title: string;
  attachmentsData?: Data[];
}


export interface DataError {
  color: keyof typeof LIST_COLOR;
  description: string
}

export interface GlobalDataError {
  channel: string;
  errorDescription: DataError;
}
