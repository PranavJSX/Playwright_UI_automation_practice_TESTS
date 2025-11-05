import { Locator, Page } from "playwright"

const url = 'https://practice.expandtesting.com/login';
export class Login{
    readonly page:Page;
    readonly username_input:Locator;
    readonly password_input:Locator;
    readonly submit:Locator

    constructor(page:Page){
        this.page = page;
        this.username_input = page.locator('#username');
        this.password_input = page.locator('#password');
        this.submit = page.locator('#submit-login');
    }

    async navigate_to_page(){
        await this.page.goto(url)   
    }

    async login(username:string,password:string){   
        await this.username_input.fill(username);
        await this.password_input.fill(password);
        await this.submit.click();
    }
}