import {test as base, Page} from '@playwright/test';
import { text } from 'stream/consumers';

type myfixtures = {
    LoggedInPage:Page,
}

export const test = base.extend<myfixtures>({
    LoggedInPage: async({page},use)=>{
        await page.goto('/');
        await page.locator('a',{hasText:'Test Login Page'}).click();
        
        await use(page);
    },
});

export { expect } from '@playwright/test';