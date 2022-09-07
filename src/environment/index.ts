import {DevEnvironment} from './dev.env';

export interface Environment {
  url: string;
}
export function getEnvVariable(): Environment {
  
    return DevEnvironment;
 
}
