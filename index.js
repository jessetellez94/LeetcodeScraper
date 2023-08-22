const axios = require('axios');
const cheerio = require('cheerio');

const baseUrl = 'https://leetcode.com';

async function scrapeLeetCodeProblems() {
  try {
    const response = await axios.get(`${baseUrl}/problemset/all/`);
    const html = response.data;
    console.log(response);
    const $ = cheerio.load(html);
    

    const problems = [];

    $('.reactable-data tr').each((index, element) => {
      const problemRow = $(element);
      const title = problemRow.find('.titleColumn a').text();
      const link = baseUrl + problemRow.find('.titleColumn a').attr('href');
      const difficulty = problemRow.find('.difficulty').text();

      problems.push({ title, link, difficulty });
    });

    return problems;
  } catch (error) {
    console.error('Error scraping data:', error.message);
    return [];
  }
}

scrapeLeetCodeProblems().then(problems => {
  console.log(JSON.stringify(problems, null, 2));
});
