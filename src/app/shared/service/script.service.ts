import { Injectable } from '@angular/core';

@Injectable()
export class ScriptService {

    private scriptsLoaded: string[] = [];

    constructor() { }

    load(...scripts: string[]): void {
        scripts.forEach((item: string) => {
            if (!this.scriptsLoaded.includes(item)) {
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = `/assets/js/${item}`;
                script.onload = () => {
                    this.scriptsLoaded.push(item);
                };
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        });
    }

}
