import { test, expect, request } from '@playwright/test';
import tags from '../Test-data/mock_obj.json';
import exp from 'constants';
import token from '../Auth/authFile.json';




test.skip('Initiation of the navigation',async({page})=>{

    await page.route('*/**/api/tags',async route=>{
        await route.fulfill({
            body:JSON.stringify(tags)
        })
    })


    await page.goto('https://conduit.bondaracademy.com/');
})


test.skip('Has title',async({page})=>{


    await page.route('*/**/api/articles*',async route=>{
        const response = await route.fetch();
        const responseBody = await response.json();
        responseBody.articles[0].title = "This is a test of mock api";
        responseBody.articles[0].description = "This is a descriptoin";

        await route.fulfill({
            body:JSON.stringify(responseBody)
        })
    })

    await page.getByText('Global Feed').click();
    const title = await page.locator('.logo-font').first().textContent();
    expect(title).toBe('conduit')

    await expect(page.locator('app-article-list h1').first()).toContainText('This is a test of mock api');
    await expect(page.locator('app-article-list p').first()).toContainText('This is a descriptoin');
})




test.skip('Delete article',async({page,request})=>{

    const article_response = await request.post('https://conduit-api.bondaracademy.com/api/articles/',{
        data:{
            "article":{"title":"Test article","description":"this is a test article.","body":"article description.","tagList":[]}
        }
    })
    await expect(article_response.status()).toBe(201);
    // console.log(article_response.json().)
    const response_body = await article_response.json();
    // console.log(response_body.article.slug);

    const slug_id = response_body.article.slug
    // console.log(slug_id);
    


    const delete_response = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slug_id}`)

    await expect(delete_response.status()).toBe(204);
})


