import { Page } from "playwright";
import { Login } from "./Login_class";

export class PageFactor{
    private readonly page:Page;

    constructor(page:Page){
        this.page = page;
    }

    getLoginPage(){
        return new Login(this.page);
    }
}