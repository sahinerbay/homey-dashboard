import { Request, Response, NextFunction } from 'express';
import path from 'path';
import * as puppeteer from 'puppeteer';
import UserAgent from 'user-agents';
import Jimp from 'jimp';
import { v4 as uuidv4 } from 'uuid';
import { convert, logger } from './../../utils';

export const CapturesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const puppeteerOptions: puppeteer.PuppeteerLaunchOptions = {
    headless: 'new',
    ignoreDefaultArgs: ['--disable-extensions'],
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  };
  if (process.env.NODE_ENV === 'prod') {
    puppeteerOptions.executablePath = '/usr/bin/chromium';
  }

  try {
    // Create a browser instance
    const browser = await puppeteer.launch(puppeteerOptions);

    // Create a new page
    const page = await browser.newPage();

    // Set viewport width and height
    await page.setViewport({ width: 1448, height: 1072 });

    const userAgent = new UserAgent();
    await page.setUserAgent(userAgent.toString());
    logger.info('User agent set to: ' + userAgent.toString());

    const website_url = `${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}`;
    logger.info('Opening URL: ' + website_url);
    await page.goto(website_url, {
      waitUntil: ['networkidle2'],
    });

    logger.info('Waiting for #Homey to be visible');
    await page.waitForSelector('#Homey');
    logger.info('Waiting for #Weather to be visible');
    await page.waitForSelector('#Weather');
    logger.info('Waiting for #Info to be visible');
    await page.waitForSelector('#Info');

    // Capture screenshot
    await page.screenshot({
      path: 'screenshot.png',
    });
    logger.info('Screenshot captured');

    // Close the browser instance
    await browser.close();
    logger.info('Browser closed');

    const image = await Jimp.read('screenshot.png');
    image.rotate(270);
    logger.info('Image rotated');

    await image.writeAsync('screenshot.png');
    logger.info('Image saved');

    if (process.env.NODE_ENV === 'prod') {
      await convert('screenshot.png');
      logger.info('Image converted');
    }

    res.sendFile('screenshot.png', { root: '.' });
  } catch (err) {
    next(err);
  }
};
