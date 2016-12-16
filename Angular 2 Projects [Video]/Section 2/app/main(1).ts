import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app.module.ts";

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);