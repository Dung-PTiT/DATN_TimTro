import { Injectable } from '@angular/core';
import {AppConfig} from "../util/app-config";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string;

  constructor() { }
}
