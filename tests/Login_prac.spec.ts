import test, { expect } from "playwright/test";
import { PageFactor } from "../helper/pageFactory";
require('dotenv').config();


let adminEmail = process.env.ADMIN_USERNAME||'';
let adminPassword = process.env.ADMIN_PASSWORD||'';

test('Succesfull Login',async({page})=>{
    const pages =  new PageFactor(page);
    await pages.getLoginPage().navigate_to_page();
    await pages.getLoginPage().login(adminEmail,adminPassword);

    const welcomeText = await page.locator('#username').innerText();
    console.log(welcomeText);
    expect(welcomeText).toBe('Hi, practice!');
    console.log(welcomeText);
})


test('Failed Login',async({page})=>{
    const pages =  new PageFactor(page);
    await pages.getLoginPage().navigate_to_page();
    await pages.getLoginPage().login('123','password');
    await page.waitForSelector('#flash');
    const test_text = await page.locator('#flash').textContent();
    console.log(test_text);
    expect(test_text).toContain('invalid');
})


test('Dynamic table test',async({page})=>{
    await page.goto('https://practice.expandtesting.com/dynamic-table');
    const tdata = await page.locator('.table-responsive').locator('table').locator('tbody').locator('tr').all();
    // console.log(tdata);
    for(let i of tdata){
        console.log(await i.textContent());
        expect(i).toBeTruthy();
    }
    
})

test('Dynamic loader',async({page})=>{
    await page.goto('https://practice.expandtesting.com/dynamic-loading/1');
    await page.getByRole('button',{name:'Start'}).click();
    await page.waitForSelector('#loading',{state:'hidden'});
    const text_val = await page.locator('#finish').textContent();
    console.log(text_val);
    expect(text_val).toBeTruthy();
})

test('Dynamic modal',async({page})=>{
    await page.goto('https://practice.expandtesting.com/entry-ad');
    
    const handler = async() =>{
        console.log('Dyanamic locator handler called');
        await page.getByRole('button',{name:'Close'}).click();
    }

    await page.addLocatorHandler(page.locator('.modal-content'),handler);
})

test.only('Handling page uploads',async({page})=>{
    await page.goto('https://practice.expandtesting.com/upload');
    
    const fileChooserPromise =  page.waitForEvent('filechooser')
    
    await page.locator('//*[@id="fileInput"]').click();
    
    const filechooser = await fileChooserPromise
    await filechooser.setFiles(`C:/\Users/\manuo/\OneDrive/\Desktop/\Upload_test.txt`);
    await page.locator('//button[@id="fileSubmit"]').click();
    console.log(test.info);

})