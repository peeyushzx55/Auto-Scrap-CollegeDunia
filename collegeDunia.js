// node collegeDunia.js --url="https://collegedunia.com" --excel=Colleges.xlsx

let minimist = require('minimist');
let fs = require('fs');
let puppeteer = require('puppeteer');
let excel = require('excel4node');
let axios = require('axios');

let args = minimist(process.argv);

async function run() {
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });

    let pages = await browser.pages();
    let page = pages[0];
    await page.goto(args.url);

    await page.waitForSelector("button.jsx-3851299306");
    await page.click("button.jsx-3851299306");

    await page.waitFor(2000);

    await page.waitForSelector("button.jsx-1016423636");
    await page.click("button.jsx-1016423636");

    await page.waitForSelector("div.jsx-3349955682 button.slick-arrow.slick-next");
    await page.click("div.jsx-3349955682 button.slick-arrow.slick-next");

    await page.waitFor(2000);

    await page.waitForSelector("a[href='/btech/mumbai-colleges']");
    await page.click("a[href='/btech/mumbai-colleges']");

    await page.waitFor(2000);

    await page.waitForSelector("li.jsx-3107713825 > label[for='City-16337']");
    await page.click("li.jsx-3107713825 > label[for='City-16337']", {clickCount: 1});

    await page.waitForSelector("a[href='/university/25703-iit-bombay-indian-institute-of-technology-iitb-mumbai']");
    await page.click("a[href='/university/25703-iit-bombay-indian-institute-of-technology-iitb-mumbai']");

    await page.waitFor(2000);


    let collegeNames = ["IIT Bombay", "ICT Mumbai", "St. Francis Institute Of Technology - [SFIT], Mumbai", "Veermata Jijabai Technological Institute - [VJTI], Mumbai", "Pillai College Of Engineering - [PCE] Navi Mumbai, Mumbai", "Mukesh Patel School Of Technology Management And Engineering - [MPSTME], Mumbai"];
    
    createExcelFile(collegeNames, args.excel);

    await page.goBack();

    await page.waitFor(2000);

    await page.waitForSelector("a[href='/university/25705-institute-of-chemical-technology-ict-mumbai']");
    await page.click("a[href='/university/25705-institute-of-chemical-technology-ict-mumbai']");

    await page.waitFor(2000);
    await page.goBack();
    await page.waitFor(2000);

    await page.waitForSelector("a[href='/college/15309-st-francis-institute-of-technology-sfit-mumbai']");
    await page.click("a[href='/college/15309-st-francis-institute-of-technology-sfit-mumbai']");
    
    await page.waitFor(2000);
    await page.goBack();
    await page.waitFor(2000);

    await page.waitForSelector("a[href='/college/28202-veermata-jijabai-technological-institute-vjti-mumbai']");
    await page.click("a[href='/college/28202-veermata-jijabai-technological-institute-vjti-mumbai']");

    await page.waitFor(2000);
    await page.goBack();
    await page.waitFor(2000);

    await page.waitForSelector("a[href='/college/14562-pillai-college-of-engineering-pce-navi-mumbai-mumbai']");
    await page.click("a[href='/college/14562-pillai-college-of-engineering-pce-navi-mumbai-mumbai']");

    await page.waitFor(2000);
    await page.goBack();
    await page.waitFor(2000);

    await page.waitForSelector("a[href='/college/14374-mukesh-patel-school-of-technology-management-and-engineering-mpstme-mumbai']");
    await page.click("a[href='/college/14374-mukesh-patel-school-of-technology-management-and-engineering-mpstme-mumbai']");

    await page.waitFor(2000);
    await page.goBack();
    await page.waitFor(2000);

}

function createExcelFile(collegeNames, excelFileName) {

    let wb = new excel.Workbook();
    let style = wb.createStyle({
        fill: {
            type: 'pattern',
            patternType: 'solid',
            fgColor: '#ADD8E6'
        },

        font: {
            bold: true,
            underline: true,
            size: 12,
            shadow: true
        },
        border: {
            left: {
                style: 'medium',
                color: '#000000'
            },

            right: {
                style: 'medium',
                color: '#000000'
            },

            top: {
                style: 'medium',
                color: '#000000'
            },

            bottom: {
                style: 'medium',
                color: '#000000'
            },
        }
    })

    for (let i = 0; i < collegeNames.length; i++) {

        let sheet = wb.addWorksheet(collegeNames[i]);

        sheet.cell(1, 1).string("Summary").style(style);
        sheet.cell(1, 2).string("Course").style(style);
        sheet.cell(1, 3).string("Fees").style(style);
        sheet.cell(1, 4).string("Eligibility").style(style);
    }

    wb.write(excelFileName);

}

run();