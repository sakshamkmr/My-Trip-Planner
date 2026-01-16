import { TripInfo } from '@/app/create-new-trip/_components/ChatBox';
import React, {createContext} from 'react';
  export type TripDetailContextType = {
   tripinfo: TripInfo | null;
   settripDetailinfo: React.Dispatch<React.SetStateAction<TripInfo>>;
 };


export const TripDetailContext = createContext<TripDetailContextType | undefined>(undefined);