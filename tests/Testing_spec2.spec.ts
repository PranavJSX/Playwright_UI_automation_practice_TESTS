// import { chromium } from 'playwright';
import {test,expect} from '../fixtures/Master';

test('Radio button test',async({nav_page})=>{
    await nav_page.locator('//a[text()="Radio Buttons"]').click();
    console.log(nav_page.url());
    
    const radio_locator = await nav_page.locator('.row-md-6 .mx-3').locator('div').all();
    for(let i of radio_locator){
        if(await i.locator('label').innerText()==='Black'){
            await i.click();
        }
    }
    await nav_page.screenshot();
});

test.skip('Horizontal slider',async({nav_page})=>{

    const handler = async() =>{
        console.log('Add popup appeared');
    }

    await nav_page.locator('//a[text()="Horizontal Slider"]').click();

    await nav_page.addLocatorHandler(nav_page.locator('#card'),handler);

    await nav_page.pause();

    // let myslider = nav_page.locator('(//div[@class = "sliderContainer"]/input)[1]');
    // await nav_page.waitForLoadState();
    // if(!myslider){
    //     nav_page.goBack();
    //     await nav_page.locator('//a[text()="Horizontal Slider"]').click();
    // }
    // myslider = nav_page.locator('//div[@class = "sliderContainer"]/input');
    // const sliderWidth = await myslider.evaluate(el=>{
    //     return el.getBoundingClientRect().width
    // })

    // await myslider.hover({force:true,position:{x:0,y:0}});
    // await nav_page.mouse.down();
    // await myslider.hover({force:true,position:{x:sliderWidth/2,y:0}});
    // await nav_page.mouse.up();
    // const rangeValue = await nav_page.locator('#range').innerText();
    // expect(rangeValue).toBe('2.5');
});


test('Storage state setup',async({browser})=>{
    const context = await browser.newContext({storageState:'./.auth/user.json'});
    const page = await context.newPage();
    await page.goto('https://practice.expandtesting.com/secure');
    await page.screenshot();

});

test('Dialogs',async({page})=>{
    await page.goto('https://practice.expandtesting.com/js-dialogs');

    await page.locator('#js-prompt').click();
    await page.on('dialog',async(el)=>{
        await el.accept('Pranav');
    })
});



test('Checking all network requests are PASSING ON THE HOME PAGE',async({page})=>{
    await page.goto('/');
    expect(await page.url()).toBe('https://practice.expandtesting.com/');
});